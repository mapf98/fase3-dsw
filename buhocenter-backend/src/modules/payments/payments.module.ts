import { Module, HttpModule } from '@nestjs/common';
import { PaymentsService } from './services/payments.service';
import { PaymentsController } from './controllers/payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { purchasesEntities } from './entities';
import { ProductsModule } from '../products/products.module';
import { PaymentsTransactionsRepository } from './transactions/payments.transactions.service';
import { StatusModule } from '../status/status.module';
import { CartsModule } from '../carts/carts.module';
import { ConfigModule } from 'src/config/config.module';
import { CryptocurrenciesService } from './services/cryptocurrencies.service';
import { CommissionsController } from './controllers/commission.controller';
import { CommissionsService } from './services/commissions.service';
import { CommissionsTransactionsRepository } from './transactions/commissions.transactions.service';
import { UsersModule } from '../users/users.module';
import { ThirdPartyModule } from '../third-party/third-party.module';
import { PaymentSubscriber } from './services/payment-subscriber.service';
import { EncryptionsModule } from '../encryptions/encryptions.module';
import { AuditModule } from '../audit/audit.module';
import { CommissionsSubscriber } from './services/commissions-subscriber.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(purchasesEntities),
        AuditModule,
        CartsModule,
        StatusModule,
        ProductsModule,
        UsersModule,
        ConfigModule,
        ThirdPartyModule,
        EncryptionsModule,
        HttpModule.register({
            timeout: 20000,
            maxRedirects: 5,
        }),
    ],
    providers: [
        PaymentsTransactionsRepository,
        PaymentsService,
        CommissionsService,
        CryptocurrenciesService,
        CommissionsTransactionsRepository,
        PaymentSubscriber,
        CommissionsSubscriber,
    ],
    controllers: [PaymentsController, CommissionsController],
})
export class PaymentsModule {}
