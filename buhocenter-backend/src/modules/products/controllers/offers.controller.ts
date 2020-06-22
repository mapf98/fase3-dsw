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
    HttpStatus,
    Delete,
} from '@nestjs/common';
import { OffersService } from '../services/offers.service';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { OffersTransactionsRepository } from '../transaction/offers.transaction.service';
import { OfferDto, OfferAssignProductDto } from '../dto/offers.dto';
import { Offer } from '../entities/offer.entity';
import { ProductTransactionsRepository } from '../transaction/products.transaction.service';

@Controller('offers')
export class OffersController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @Inject(OffersTransactionsRepository)
        private readonly offersTransactionsRepository: OffersTransactionsRepository,
        @Inject(ProductTransactionsRepository)
        private readonly productTransactionsRepository: ProductTransactionsRepository,
    ) {}

    @Post()
    async createOffer(@Res() res: Response, @Body() offerData: OfferDto): Promise<Response> {
        this.logger.info(`createOffer: starting to create the offer`, {
            context: OffersController.name,
        });
        try {
            let response: Offer = await this.offersTransactionsRepository.createOffer(offerData);
            return res.status(HttpStatus.OK).send(response);
        } catch (e) {
            this.logger.info(
                `createOffer: error when trying to create the offer [error=${JSON.stringify(offerData)}]`,
                { context: OffersController.name },
            );
            return res.status(HttpStatus.BAD_REQUEST).send();
        }
    }

    @Delete('/:id')
    async deleteOffer(@Res() res: Response, @Param('id') offerId: number): Promise<Response> {
        this.logger.info(`createOffer: starting to create the offer`, {
            context: OffersController.name,
        });
        try {
            let response: Offer = await this.offersTransactionsRepository.deleteOffer(offerId);
            return res.status(HttpStatus.OK).send(response);
        } catch (e) {
            this.logger.info(
                `createOffer: error when trying to delete a offer with id [id=${offerId}|error=${JSON.stringify(
                    offerId,
                )}]`,
                { context: OffersController.name },
            );
            return res.status(HttpStatus.BAD_REQUEST).send();
        }
    }

    @Get()
    async getAllOffers(@Res() res: Response): Promise<Response> {
        this.logger.info(`getAllOffers: starting process to get all available offers`, {
            context: OffersController.name,
        });
        try {
            let response: Offer[] = await this.offersTransactionsRepository.getOffers();
            return res.status(HttpStatus.OK).send(response);
        } catch (e) {
            this.logger.info(
                `createOffer: error when trying to delete a offer with id [error=${JSON.stringify(
                    e.message,
                )}]`,
                { context: OffersController.name },
            );
            return res.status(HttpStatus.BAD_REQUEST).send();
        }
    }

    @Post('product')
    async assingOfferToProduct(
        @Res() res: Response,
        @Body() OfferForProduct: OfferAssignProductDto,
    ): Promise<Response> {
        this.logger.info(
            ` assingOfferToProduct: starting process assign a offer to product with id [prorductId=${OfferForProduct.product.id}|offerId=${OfferForProduct.offer.id}]`,
            {
                context: OffersController.name,
            },
        );
        try {
            let response: boolean = await this.productTransactionsRepository.assingOfferToProduct(
                OfferForProduct,
            );
            return res.status(HttpStatus.OK).send(response);
        } catch (e) {
            this.logger.info(
                `createOffer: error when trying to assign a offer with id to the product with id [offerId=${
                    OfferForProduct.product.id
                } | productId=${OfferForProduct.offer.id} | error=${JSON.stringify(e.message)}]`,
                { context: OffersController.name },
            );
            return res.status(HttpStatus.BAD_REQUEST).send();
        }
    }

    @Delete('product/:id')
    async deleteOfferFromProduct(@Res() res: Response, @Param('id') productId: number): Promise<Response> {
        this.logger.info(
            ` deleteOfferFromProduct: starting process assign a offer to product with id [prorductId=${productId}]`,
            {
                context: OffersController.name,
            },
        );
        try {
            let response: boolean = await this.productTransactionsRepository.deleteOfferToProduct(productId);
            return res.status(HttpStatus.OK).send(response);
        } catch (e) {
            this.logger.info(
                `createOffer: error when trying to delete a offer with id to the product with id [offerId=${productId} | error=${JSON.stringify(
                    e.message,
                )}]`,
                { context: OffersController.name },
            );
            return res.status(HttpStatus.BAD_REQUEST).send();
        }
    }
}
