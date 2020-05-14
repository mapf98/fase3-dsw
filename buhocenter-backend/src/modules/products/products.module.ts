import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { productEntities } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './controllers/services.controller';
import { ServicesService } from './services/services.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(productEntities),
  ],
  controllers: [ProductsController, ServicesController],
  providers: [ProductsService, ServicesService]
})
export class ProductsModule {}
