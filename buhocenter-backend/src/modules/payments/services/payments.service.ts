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

@Injectable()
export class PaymentsService {
    private _paymentClient: IPaymentClient;

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly _logger: Logger,
        @InjectRepository(Payment)
        private readonly _paymentRepository: Repository<Payment>,
        private readonly _cartService: CartsService,
        private readonly _commissionService: CommissionsService,
        private readonly _cryptocurrencyService: CryptocurrenciesService,
        private readonly _statusService: StatusService,
        private readonly _configService: ConfigService,
    ) {
        this._paymentClient = new CoingatePaymentStrategy(this._configService);
    }

    /**
     * createOrder
     * @param checkout: Checkout
     * @returns Promise<NewPayment>
     */
    async createOrder(checkout: Checkout): Promise<NewPayment> {
        this._logger.debug(`createOrder: Creating a new order`, {
            context: PaymentsService.name,
        });

        const price = this._cartService.getPriceForCarts(checkout.cartsForPayment);
        const activeCommission = await this._commissionService.getActiveCommission();
        const newOrderStatus = await this._statusService.getStatusById(STATUS.NEW.id);

        let payment: Payment = new Payment();
        payment.total = price + price * activeCommission.serviceFee + price * activeCommission.processorFee;
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
                await this._cartService.reserveCarts(checkout.cartsForPayment, transactionEntityManager);
                const paymentTransactionRepository: Repository<Payment> = transactionEntityManager.getRepository(
                    Payment,
                );
                await paymentTransactionRepository.save(payment);
                order = await this._paymentClient.createOrder(payment.id, payment.total);
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
        this._logger.debug(
            `callbackOrders: Receiving the status of a payment [paymentId=${order.order_id}]`,
            {
                context: PaymentsService.name,
            },
        );

        const payment = await this.getPaymentById(parseInt(order.order_id));
        const status = await this._statusService.getStatusByName(order.status);

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
                    await this._cartService.payCarts(payment.carts, status);
                    break;
                case STATUS.INVALID.name:
                case STATUS.CANCELED.name:
                case STATUS.EXPIRED.name:
                    await this._cartService.giveBackCarts(payment.carts);
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
        this._logger.debug(`getPaymentById: Getting a payment by id [paymentId=${paymentId}]`, {
            context: PaymentsService.name,
        });

        return await this._paymentRepository
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
        this._logger.debug(
            `updatePaymentStatus: Updating de status of a payment [paymentId=${payment.id}|statusName=${status.name}]`,
            {
                context: PaymentsService.name,
            },
        );

        let statusHistory = new StatusHistory();
        statusHistory.status = status;
        payment.statusHistories.push(statusHistory);

        await this._paymentRepository.save(payment);
    }

    /**
     * setPaymentCryptocurrency
     * @param payment: Payment
     * @param totalCryptocurrency: number
     * @param cryptocurrencyIso: string
     * @returns void
     */
    async setPaymentCryptocurrency(payment: Payment, totalCryptocurrency: number, cryptocurrencyIso: string) {
        this._logger.debug(
            `setPaymentCryptocurrency: Setting cryptocurrency of a payment [paymentId=${payment.id}|cryptocurrencyIso=${cryptocurrencyIso}]`,
            {
                context: PaymentsService.name,
            },
        );

        const cryptocurrency = await this._cryptocurrencyService.getCryptotocurrencyByIso(cryptocurrencyIso);
        payment.totalCryptocurrency = totalCryptocurrency;
        payment.cryptocurrency = cryptocurrency;

        await this._paymentRepository.save(payment);
    }
}
