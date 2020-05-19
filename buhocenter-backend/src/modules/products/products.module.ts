import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import {ProductRating}  from './entities/product-rating.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from '../services/services.module'
import { ProductInventory } from './entities/product-inventory.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Product,ProductRating, ProductInventory]),ServicesModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]

})
export class ProductsModule {}
