import { Controller, Inject, Post, Body } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ProductRatingsService } from '../services/product-ratings.service';
import { ProductRating } from '../entities/product-rating.entity';

@Controller('product-ratings')
export class ProductRatingsController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly productRatingsService: ProductRatingsService,
    ) {}

    @Post()
    async createProductRating(@Body() productRating: Partial<ProductRating>): Promise<ProductRating> {
        this.logger.info(`createProductRating: Creating a product rating`, {
            context: ProductRatingsController.name,
        });

        return await this.productRatingsService.createProductRating(productRating);
    }
}
