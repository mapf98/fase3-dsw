import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { productEntities } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature(productEntities),
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
