import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IPaymentClient } from '../interfaces/payment-client';
import { CoingatePaymentStrategy } from '../strategies/coingate-payment.strategy';
import { ConfigService } from 'src/config/config.service';
import { Checkout } from '../interfaces/checkout';
import { NewPayment } from '../interfaces/new-payment';
import { StatusService } from 'src/modules/status/services/status.service';
import { STATUS } from 'src/config/constants';
import { CartsService } from 'src/modules/carts/services/carts.service';
import { Payment } from '../entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Brackets } from 'typeorm';
import { CommissionsService } from './commissions.service';
import { StatusHistory } from 'src/modules/status/entities/status-history.entity';
import { NewOrder } from '../interfaces/new-order';
import { OrderStatus } from '../interfaces/order-status';
import { Status } from 'src/modules/status/entities/status.entity';
import { CryptocurrenciesService } from './cryptocurrencies.service';
import { ProductRatingsService } from 'src/modules/products/services/product-ratings.service';

@Injectable()
export class PaymentsService {
    private paymentClient: IPaymentClient;

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        private readonly cartService: CartsService,
        private readonly commissionService: CommissionsService,
        private readonly cryptocurrencyService: CryptocurrenciesService,
        private readonly statusService: StatusService,
        private readonly productRatingService: ProductRatingsService,
        private readonly configService: ConfigService,
    ) {
        this.paymentClient = new CoingatePaymentStrategy(this.configService);
    }

    /**
     * createOrder
     * @param checkout: Checkout
     * @returns Promise<NewPayment>
     */
    async createOrder(checkout: Checkout): Promise<NewPayment> {
        this.logger.debug(`createOrder: Creating a new order`, {
            context: PaymentsService.name,
        });

        const price = this.cartService.getPriceForCarts(checkout.cartsForPayment);
        const activeCommission = await this.commissionService.getActiveCommission();
        const newOrderStatus = await this.statusService.getStatusById(STATUS.NEW.id);

        let payment: Payment = new Payment();
        payment.total = parseFloat(
            (price + price * activeCommission.serviceFee + price * activeCommission.processorFee).toFixed(2),
        );
        payment.address = checkout.address;
        payment.commission = activeCommission;
        payment.foreignExchange = checkout.foreignExchange;
        payment.carts = checkout.cartsForPayment;

        let statusHistory = new StatusHistory();
        statusHistory.status = newOrderStatus;
        payment.statusHistories = [statusHistory];

        let order: NewOrder;

        await getManager().transaction(async transactionEntityManager => {
            try {
                await this.cartService.reserveCarts(checkout.cartsForPayment, transactionEntityManager);
                const paymentTransactionRepository: Repository<Payment> = transactionEntityManager.getRepository(
                    Payment,
                );
                await paymentTransactionRepository.save(payment);
                order = await this.paymentClient.createOrder(payment.id, payment.total);
                payment.transaction = order.id;
                await paymentTransactionRepository.save(payment);
            } catch (error) {
                throw error;
            }
        });

        return {
            payment: payment,
            order: order,
        };
    }

    /**
     * callbackOrders
     * @param order: OrderStatus
     * @returns Promise<OrderStatus>
     */
    async callbackOrders(order: OrderStatus): Promise<OrderStatus> {
        this.logger.debug(`callbackOrders: Receiving the status of a payment [paymentId=${order.order_id}]`, {
            context: PaymentsService.name,
        });

        const payment = await this.getPaymentById(parseInt(order.order_id));
        const status = await this.statusService.getStatusByName(order.status);

        try {
            switch (order.status) {
                case STATUS.PENDING.name:
                    await this.setPaymentCryptocurrency(
                        payment,
                        parseFloat(order.pay_amount),
                        order.pay_currency,
                    );
                    break;
                case STATUS.PAID.name:
                    await this.cartService.payCarts(payment.carts, status);
                    break;
                case STATUS.INVALID.name:
                case STATUS.CANCELED.name:
                case STATUS.EXPIRED.name:
                    await this.cartService.giveBackCarts(payment.carts);
                    break;
            }
        } catch (error) {
            throw error;
        } finally {
            await this.updatePaymentStatus(payment, status);
            return order;
        }
    }

    /**
     * getPaymentById
     * @param paymentId: number
     * @returns Promise<Payment>
     */
    async getPaymentById(paymentId: number): Promise<Payment> {
        this.logger.debug(`getPaymentById: Getting a payment by id [paymentId=${paymentId}]`, {
            context: PaymentsService.name,
        });

        return await this.paymentRepository
            .createQueryBuilder('payment')
            .innerJoinAndSelect('payment.carts', 'carts')
            .innerJoinAndSelect('payment.statusHistories', 'statusHistories')
            .where('payment.id = :paymentId', { paymentId: paymentId })
            .getOne();
    }

    /**
     * updatePaymentStatus
     * @param payment: Payment
     * @param status: Status
     * @retuns void
     */
    async updatePaymentStatus(payment: Payment, status: Status) {
        this.logger.debug(
            `updatePaymentStatus: Updating de status of a payment [paymentId=${payment.id}|statusName=${status.name}]`,
            {
                context: PaymentsService.name,
            },
        );

        let statusHistory = new StatusHistory();
        statusHistory.status = status;
        payment.statusHistories.push(statusHistory);

        await this.paymentRepository.save(payment);
    }

    /**
     * setPaymentCryptocurrency
     * @param payment: Payment
     * @param totalCryptocurrency: number
     * @param cryptocurrencyIso: string
     * @returns void
     */
    async setPaymentCryptocurrency(payment: Payment, totalCryptocurrency: number, cryptocurrencyIso: string) {
        this.logger.debug(
            `setPaymentCryptocurrency: Setting cryptocurrency of a payment [paymentId=${payment.id}|cryptocurrencyIso=${cryptocurrencyIso}]`,
            {
                context: PaymentsService.name,
            },
        );

        const cryptocurrency = await this.cryptocurrencyService.getCryptotocurrencyByIso(cryptocurrencyIso);
        payment.totalCryptocurrency = totalCryptocurrency;
        payment.cryptocurrency = cryptocurrency;

        await this.paymentRepository.save(payment);
    }

    /**
     * getPaymentsByUserId
     * @param userId: number
     * @returns Payment[]
     */
    async getPaymentsByUserId(userId: number): Promise<Payment[]> {
        this.logger.debug(`getPaymentsByUserId: Getting the payments of a user [userId=${userId}]`, {
            context: PaymentsService.name,
        });

        return await this.paymentRepository
            .createQueryBuilder('payment')
            .innerJoinAndSelect('payment.statusHistories', 'statusHistories')
            .innerJoinAndSelect('statusHistories.status', 'status')
            .where('status.id <> :id', { id: STATUS.CANCELED.id })
            .andWhere('status.id <> :id', { id: STATUS.EXPIRED.id })
            .andWhere('status.id <> :id', { id: STATUS.INVALID.id })
            .innerJoinAndSelect('payment.commission', 'commission')
            .innerJoinAndSelect('payment.foreignExchange', 'foreignExchange')
            .leftJoinAndSelect('payment.cryptocurrency', 'cryptocurrency')
            .innerJoin('payment.carts', 'carts')
            .andWhere('carts.user = :id', { id: userId })
            .getMany();
    }

    /**
     * getPaymentsById
     * @param paymentId: number
     * @returns Paymen
     */
    async getPaymentsById(paymentId: number): Promise<Payment> {
        this.logger.debug(`getPaymentsById: Getting a payment by its id [paymentId=${paymentId}]`, {
            context: PaymentsService.name,
        });

        let payment = await this.paymentRepository.findOne({
            relations: [
                'address',
                'address.user',
                'commission',
                'statusHistories',
                'statusHistories.status',
                'foreignExchange',
                'cryptocurrency',
                'carts',
                'carts.product',
                'carts.product.productPhotos',
                'carts.product.brand',
                'carts.product.provider',
            ],
            where: { id: paymentId },
        });

        const userId = payment.address.user.id;

        const CartsNumber = Array.from({ length: payment.carts.length }, (array, index) => index);

        for await (let index of CartsNumber) {
            const productRating = await this.productRatingService.getProductRatingByUserIdAndProductId(
                userId,
                payment.carts[index].product.id,
            );
            if (productRating) {
                payment.carts[index].product.productRatings = [productRating];
            } else {
                payment.carts[index].product.productRatings = [];
            }
        }

        return payment;
    }
}
