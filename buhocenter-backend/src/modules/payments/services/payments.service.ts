import { Injectable, Inject } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { EntityManager, Repository } from 'typeorm';
import { PaymentGatewayRepository } from '../repositories/payment-gateway.repository';
import { ProductsService } from '../../products/services/products.service';
import { ITEM_TYPE, UTRUST_PAYMENT_STATUS, PLATFORM_PARAMETERS } from '../../../config/constants';
import { Payment } from '../entities/payment.entity';
import { PaymentOrderDto } from '../dto/payments.dto';
import { Product } from '../../products/entities/product.entity';
import { StatusService } from '../../status/services/status.service';
import { STATUS } from '../../../config/constants';
import { StatusHistory } from '../../status/entities/status-history.entity';
import { CartsService } from '../../carts/services/carts.service';
import { Cart } from '../../carts/entities/cart.entity';

@Injectable()
export class PaymentsService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly paymentGatewayRepository: PaymentGatewayRepository,
        private readonly productsService: ProductsService,
        private readonly statusService: StatusService,
        private readonly cartsService: CartsService,
    ) {}
}
