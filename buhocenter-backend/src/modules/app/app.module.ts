import { Module } from '@nestjs/common';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from '../settings/services/logger.service';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PlatformManagementModule } from '../platform-management/platform-management.module';
import { ProductsModule } from '../products/products.module';
import { PurchasesModule } from '../purchases/purchases.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    PurchasesModule,
    NotificationsModule,
    PlatformManagementModule,
    WinstonModule.forRootAsync({
      useClass: LoggerSettingsService,
    }),
    TypeOrmModule.forRoot(),
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
