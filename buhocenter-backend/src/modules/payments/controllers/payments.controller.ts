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
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PaymentsService } from '../services/payments.service';
import { NewPayment } from '../interfaces/new-payment';
import { Checkout } from '../interfaces/checkout';
import { OrderStatus } from '../interfaces/order-status';

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
}
