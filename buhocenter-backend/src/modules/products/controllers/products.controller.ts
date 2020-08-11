import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    ParseIntPipe,
    Query,
    Inject,
    Res,
    Delete,
    UseInterceptors,
    Put,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ProductParameters } from '../interfaces/product-parameters';
import { PaginatedProducts } from '../interfaces/paginated-products';
import { CustomerLoyaltyInterceptor } from '../../../common/customer-loyalty-product-points.interceptor';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    @Post()
    async createProduct(@Body() product: Partial<Product>): Promise<Product> {
        this.logger.info(`createProduct: Creating a product`, {
            context: ProductsController.name,
        });
        return await this.productsService.createProduct(product);
    }

    @Get('daily-recommendation')
    @UseInterceptors(CustomerLoyaltyInterceptor)
    async getDailyProductsRecommendation(): Promise<Product[]> {
        this.logger.info(`getDailyProductsRecommendation: products recomendados del dia `, {
            context: ProductsController.name,
        });

        return this.productsService.getDailyProductsRecommendation();
    }

    @Get('all')
    async getAllProducts(): Promise<Product[]> {
        this.logger.info(`getAllProducts: getting all accessibles products`, {
            context: ProductsController.name,
        });

        return await this.productsService.getAllProducts();
    }

    @Get(':id')
    @UseInterceptors(CustomerLoyaltyInterceptor)
    async getProductById(@Param('id', new ParseIntPipe()) id: number): Promise<Product> {
        this.logger.info(`getProductById: getting the product with id [id=${id}]`, {
            context: ProductsController.name,
        });

        return this.productsService.getProductById(id);
    }

    @Get()
    @UseInterceptors(CustomerLoyaltyInterceptor)
    getProducts(@Query() parameters: ProductParameters): Promise<PaginatedProducts> {
        this.logger.info('getProducts: Getting products by a set of parameters', {
            context: ProductsController.name,
        });

        return this.productsService.getProducts(parameters);
    }

    @Put()
    async updateProduct(@Body() product: Partial<Product>): Promise<Product> {
        this.logger.info(`updateProduct: Updating the product [productId=${product.id}]`, {
            context: ProductsController.name,
        });
        return await this.productsService.updateProduct(product);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') productId: number): Promise<Boolean> {
        this.logger.info(`deleteProduct: Deleting the product with id [productId=${productId}]`, {
            context: ProductsController.name,
        });

        return await this.productsService.deleteProduct(productId);
    }

    @Get('invoice/:id')
    async viewOrderPDF(@Res() res: Response, @Param('id') paymentId: number): Promise<any> {
        const path = require('path');
        this.logger.info(`generateOrderPDF: generating pdf of the order with id [dirname=${paymentId})]`, {
            context: ProductsController.name,
        });

        this.productsService.viewPdf(paymentId, res);
    }
}
