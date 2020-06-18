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
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ProxyService } from '../services/proxy.service';
import { PaymentsService } from '../services/payments.service';
import { UTRUST_PAYMENT_STATUS } from '../../../config/constants';
import { PaymentsTransactionsRepository } from '../transactions/payments.transactions.service';
import { PaymentOrderDto } from '../dto/payments.dto';
import { join } from 'path';

@Controller('payments')
export class PaymentsController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly paymentsService: PaymentsService,
        private readonly paymentsTransactionRepository: PaymentsTransactionsRepository,
    ) {}
}
