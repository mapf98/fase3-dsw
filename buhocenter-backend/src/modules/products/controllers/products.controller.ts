import { Controller, Get, Param, Post, Body, ParseIntPipe, Query, Inject, Res, HttpStatus } from '@nestjs/common';
import { ProductsService } from '../services/products.service'
import { Product } from '../entities/product.entity'
import { ProductDTO } from '../dto/products.dto'
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('products')
export class ProductsController {

	constructor (
		private readonly productsService: ProductsService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
		public service: ProductsService,
	) {}

	@Get('daily-recommendation')
	async getDailyProductsRecommendation(
		@Res() res: Response,
	): Promise<Response> {
		this.logger.info(
			`getDailyProductsRecommendation: productos recomendados del dia `,
			{ context: ProductsController.name },
		);
		try {
			const products: Product[] = await this.productsService.getDailyProductsRecommendation();
			return res.status(HttpStatus.OK).send(products);
		} catch (e) {
			return res.status(HttpStatus.BAD_REQUEST).send();
		}
	}


	@Get(':id')
	async getProductById(
		@Res() res: Response,
		@Param('id', new ParseIntPipe()) id: number,
	): Promise<Response> {
		this.logger.info(`getProductById: obteniendo el producto por id [id=${id}]`, { context: ProductsController.name });

		try {
			const product = await this.productsService.getProductById(id);
			return res.status(HttpStatus.OK).send(product);
		} catch (e) {
			this.logger.error(`Error obteniendo el producto por el id ${id}`, { context: ProductsController.name });
			this.logger.error(`${e}`, { context: ProductsController.name });
			return res.status(HttpStatus.NOT_FOUND).send();
		}
	}

	@Get()
	async getProducts(
		@Res() res: Response,
		@Query('page', new ParseIntPipe()) page: number,
		@Query('catalogueId') catalogueId: number,
	): Promise<Response> {
		this.logger.info(
			`getProducts: obteniendo los productos [page=${page}|catalogueId=${catalogueId}]`,
			{ context: ProductsController.name },
		);
		try {
			const [products, total]: [Product[], number] = await this.productsService.getProducts(page, catalogueId);
			return res.status(HttpStatus.OK).send([products, total]);
		} catch (e) {
			return res.status(HttpStatus.BAD_REQUEST).send();
		}
	}


}
