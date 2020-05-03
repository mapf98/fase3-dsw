import { Module } from '@nestjs/common';
import { PurchasesService } from './services/purchases.service';
import { PurchasesController } from './controllers/purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { purchasesEntities } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature(purchasesEntities),
  ],
  providers: [PurchasesService],
  controllers: [PurchasesController]
})
export class PurchasesModule {}
