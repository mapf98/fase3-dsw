import { Module, HttpModule } from '@nestjs/common';
import { PaymentsService } from './services/payments.service';
import { PaymentsController } from './controllers/payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { purchasesEntities } from './entities';
import { ProxyService } from './services/proxy.service';
import { PaymentGatewayRepository } from './repositories/payment-gateway.repository';
import { ProductsModule } from '../products/products.module';
import { PaymentsTransactionsRepository } from './transactions/payments.transactions.service';
import { StatussModule } from '../status/status.module';
import { CartsModule } from '../carts/carts.module';
import { ConfigModule } from 'src/config/config.module';
import { CryptocurrenciesService } from './services/cryptocurrencies.service';
import { CommissionsController } from './controllers/commission.controller';
import { CommissionsService } from './services/commissions.service';
import { CommissionsTransactionsRepository } from './transactions/commissions.transactions.service'

@Module({
    imports: [
        CartsModule,
        StatussModule,
        ConfigModule,
        TypeOrmModule.forFeature(purchasesEntities),
        HttpModule.register({
            timeout: 20000,
            maxRedirects: 5,
        }),
    ],
    providers: [
        PaymentsTransactionsRepository,
        PaymentGatewayRepository,
        PaymentsService,
        ProxyService,
        CommissionsService,
        CryptocurrenciesService,
        CommissionsTransactionsRepository
    ],
    controllers: [PaymentsController,CommissionsController],
})
export class PaymentsModule {}
