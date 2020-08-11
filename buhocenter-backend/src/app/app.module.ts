import { Module, MiddlewareConsumer } from '@nestjs/common';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from '../modules/settings/services/logger.service';
import { UsersModule } from '../modules/users/users.module';
import { ProductsModule } from '../modules/products/products.module';
import { PaymentsModule } from '../modules/payments/payments.module';
import { CartsModule } from '../modules/carts/carts.module';
import { StatusModule } from '../modules/status/status.module';
import { AddressModule } from '../modules/address/address.module';
import { AuthModule } from '../modules/auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from 'src/config/config.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { NotificationsModule } from '../modules/notifications/notifications.module';
import { ThirdPartyModule } from '../modules/third-party/third-party.module';
import { AuditModule } from '../modules/audit/audit.module';
import { RequestContextMiddleware } from '../common/middlewares/request-context.middleware';
import { RequestContextModule } from '../modules/request-context/request-context.module';
import { EncryptionsModule } from '../modules/encryptions/encryptions.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        AddressModule,
        AuditModule,
        AuthModule,
        CartsModule,
        ConfigModule,
        DatabaseModule,
        EncryptionsModule,
        NotificationsModule,
        PaymentsModule,
        ProductsModule,
        RequestContextModule,
        StatusModule,
        ThirdPartyModule,
        UsersModule,
        WinstonModule.forRootAsync({
            useClass: LoggerSettingsService,
        }),
        SendGridModule.forRoot({
            apikey: process.env.SENDGRID_API_KEY,
        }),
    ],
    controllers: [AppController],
    providers: [AppService, AllExceptionsFilter],
    exports: [AllExceptionsFilter],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestContextMiddleware).forRoutes('*');
    }
}
