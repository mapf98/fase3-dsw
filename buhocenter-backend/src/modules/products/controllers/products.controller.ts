import { Controller, Get, ParseIntPipe, Query, Inject, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

    @Get()
    async getProducts(
        @Res() res: Response,
        @Query('page', new ParseIntPipe()) page: number,
        @Query('catalogueId') catalogueId: number,
    ): Promise<Response> {
        try {
            const [products, total]: [Product[], number] = await this.productsService.getProducts(page, catalogueId);
            return res.status(HttpStatus.OK).send([products, total]);
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).send();
        }
    }
}
