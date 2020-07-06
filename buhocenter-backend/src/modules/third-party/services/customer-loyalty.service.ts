import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Product } from '../../products/entities/product.entity';
import { CURRENCY } from '../../../config/constants';
import { CustomerLoyaltyActions } from '../enums/customer-loyalty-actions.enum';
import { CustomerLoyaltyItems } from '../interfaces/customer-loyalty-items';
import { CustomerLoyaltyAccumulatePoints } from '../interfaces/customer-loyalty-accumulate-points';
import { CustomerLoyaltyRepository } from '../repositories/customer-loyalty.repository';

@Injectable()
export class CustomerLoyaltyService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly customerLoyaltyRepository: CustomerLoyaltyRepository,
    ) {}

    public async getProductsAccumulatedPoints(products: Product[], token: string): Promise<any> {
        const transformedProducts: CustomerLoyaltyItems[] = [];

        for await (const product of products) {
            if (product.canAccumulatePoints) {
                const transformedProduct = {
                    id: `${product.id}`,
                    priceTag: parseFloat((product.price * 100).toFixed(0)),
                    currency: CURRENCY.PRICE.toLowerCase(),
                };

                transformedProducts.push(transformedProduct);
            }
        }

        if (transformedProducts.length) {
            const request: CustomerLoyaltyAccumulatePoints = {
                apiKey: process.env.PETROMILES_API_KEY,
                type: CustomerLoyaltyActions.CONSULT,
                products: transformedProducts,
            };

            const productsAccumulatedPoints = await this.customerLoyaltyRepository.accumulatePoints(request, token);

            return this.addPointsToProductItems(products, productsAccumulatedPoints.request.products);
        }

        return products;
    }

    private addPointsToProductItems(products, productsAccumulatedPoints) {
        return products.map(i => {
            if (i.canAccumulatePoints) {
                const itemFound = productsAccumulatedPoints.find(j => j.id === `${i.id}`);
                i.tentativePoints = itemFound.tentativePoints;
            }
            return i;
        });
    }
}
