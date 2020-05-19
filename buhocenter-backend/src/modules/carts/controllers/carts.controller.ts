import { Controller, Get,Param,Post,Body,ParseIntPipe, Query, Inject, Res, HttpStatus} from '@nestjs/common';
import { CartsService } from '../services/carts.service'
import { Cart } from '../entities/cart.entity'
import { CartServiceDTO } from '../dto/cartService.dto'
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('carts')
export class CartsController {

	constructor (
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
		public readonly service: CartsService
	) {}

	@Post('services')
	async associateCartServices(
		@Res() res: Response,
		@Body() body: CartServiceDTO
	): Promise<Response> {
		this.logger.info(`associateCartServices: asociando el servicio al carrito`, { context: CartsController.name });
		try {
			const response= await this.service.asociateServiceCart(body);
			return res.status(HttpStatus.OK).send(response);
		}
		catch (e) {
			return res.status(HttpStatus.BAD_REQUEST).send();
		}
	}
}
