import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { productEntities } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity'
import { Brand } from './entities/brand.entity'
import { Provider } from './entities/provider.entity'
import { Cart } from './entities/cart.entity'
import { ProductCart } from './entities/product-cart.entity'
import { Customer } from './../users/entities/customer.entity'


@Module({
  imports: [
    TypeOrmModule.forFeature([Product,ProductCart,Customer,Cart]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
