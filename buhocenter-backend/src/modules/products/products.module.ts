import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import {ProductRating} from './entities/product-rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CategoriesController} from './controllers/categories.controller';
import {CategoriesService} from './services/categories.service';
import { ServicesModule } from '../services/services.module';
import { ProductInventory } from './entities/product-inventory.entity';
import {Category} from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductRating, ProductInventory, Category]), ServicesModule
  ],
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule {}
