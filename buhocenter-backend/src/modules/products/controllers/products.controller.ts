import { Controller, Get,Param,Post,Body,ParseIntPipe, Query, Inject, Res, HttpStatus} from '@nestjs/common';
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
		public service: ProductsService
	) {}

	@Post(':id')
		async getCartprod(@Param('id') user: number, @Body() body: ProductDTO) :Promise<any>{
		return this.service.asociateProductCart(user,body);
	}

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
