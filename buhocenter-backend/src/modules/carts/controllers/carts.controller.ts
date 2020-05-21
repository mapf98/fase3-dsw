import { Controller, Get,Param,Post,Body,ParseIntPipe, Query, Inject, Res, HttpStatus} from '@nestjs/common';
import { CartsService } from '../services/carts.service'
import { Cart } from '../entities/cart.entity'
import { CartProductDTO } from '../dto/cartProduct.dto'
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CartServiceDTO } from '../dto/cartService.dto'


@Controller('carts')
export class CartsController {

	constructor (
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
		public readonly service: CartsService
	) {}


	@Post('products')
	async associateProductsCart(
		@Res() res: Response,
		@Body() body: CartProductDTO
	): Promise<Response> {
		try {
			const response = await this.service.asociateProductCart(body);
			return res.status(HttpStatus.OK).send(response);
		}
		catch(e){
			return res.status(HttpStatus.BAD_REQUEST).send();
		} 
	}

	@Post('services')
	async associateCartServices(
		@Res() res: Response,
		@Body() body: CartServiceDTO
	) {
		this.logger.info(`associateCartServices: asociando el servicio al carrito`, { context: CartsController.name });
	
			const response = await this.service.asociateServiceCart(body);
			return res.status(HttpStatus.OK).send(response);
		

	}
}
