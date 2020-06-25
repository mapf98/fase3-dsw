import {
    Controller,
    Inject,
    Get,
    Res,
    Param,
    ParseIntPipe,
    HttpStatus,
    Post,
    Body,
    HttpCode,
    Query,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PaymentsService } from '../services/payments.service';
import { NewPayment } from '../interfaces/new-payment';
import { Checkout } from '../interfaces/checkout';
import { OrderStatus } from '../interfaces/order-status';
import { Payment } from '../entities/payment.entity';

@Controller('payments')
export class PaymentsController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly _logger: Logger,
        private readonly _paymentsService: PaymentsService,
    ) {}

    @Post('/orders')
    createOrder(@Body() checkout: Checkout): Promise<NewPayment> {
        this._logger.info(`createOrder: Creating a new order`, {
            context: PaymentsController.name,
        });

        return this._paymentsService.createOrder(checkout);
    }

    @HttpCode(200)
    @Post('/orders/callback')
    callbackOrders(@Body() order: OrderStatus): Promise<OrderStatus> {
        this._logger.info(`callbackOrders: receiving the status of a payment`, {
            context: PaymentsController.name,
        });

        return this._paymentsService.callbackOrders(order);
    }

    @Get()
    getPaymentsByUserId(@Query('userId', new ParseIntPipe()) userId: number): Promise<Payment[]> {
        this._logger.info('getPaymentsByUserI: Getting the payments of a user', {
            context: PaymentsController.name,
        });

        return this._paymentsService.getPaymentsByUserId(userId);
    }

    @Get(':id')
    getPaymentsById(@Param('id', new ParseIntPipe()) id: number): Promise<Payment> {
        this._logger.info('getPaymentsByUserI: Getting a payment by its id', {
            context: PaymentsController.name,
        });

        return this._paymentsService.getPaymentsById(id);
    }
}
