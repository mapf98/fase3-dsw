import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { StatusModule } from '../status/status.module';
import { BrandsController } from './controllers/brand.controllers';
import { ProvidersController } from './controllers/provider.controllers';
import { BrandsService } from './services/brands.service';
import { ProvidersService } from './services/providers.service';
import { CategoriesService } from './services/categories.service';
import { CataloguesService } from './services/catalogues.service';
import { CategoriesController } from './controllers/categories.controller';
import { CataloguesController } from './controllers/catalogues.controllers';
import { entities } from './entities';
import { OffersService } from './services/offers.service';
import { OffersController } from './controllers/offers.controller';
import { OffersTransactionsRepository } from './transaction/offers.transaction.service';
import { ProductInventoriesService } from './services/product-inventories.service';
import { ProductRatingsController } from './controllers/product-rating.controller';
import { ProductRatingsService } from './services/product-ratings.service';
import { ThirdPartyModule } from '../third-party/third-party.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { OffersSubscriber } from './services/offers-subscriber.service';
import { AuditModule } from '../audit/audit.module';

@Module({
    imports: [
        AuditModule,
        AuthModule,
        StatusModule,
        ThirdPartyModule,
        TypeOrmModule.forFeature(entities),
        forwardRef(() => UsersModule),
    ],
    controllers: [
        ProductsController,
        BrandsController,
        ProvidersController,
        CategoriesController,
        CataloguesController,
        OffersController,
        ProductRatingsController,
    ],
    providers: [
        ProductsService,
        BrandsService,
        ProvidersService,
        CataloguesService,
        CategoriesService,
        OffersService,
        OffersSubscriber,
        OffersTransactionsRepository,
        ProductInventoriesService,
        ProductRatingsService,
    ],
    exports: [ProductsService, OffersService, ProductInventoriesService, ProductRatingsService],
})
export class ProductsModule {}
