import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerSettingsService } from '../settings/services/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PlatformManagementModule } from '../platform-management/platform-management.module';
import { ProductsModule } from '../products/products.module';
import { PurchasesModule } from '../purchases/purchases.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
