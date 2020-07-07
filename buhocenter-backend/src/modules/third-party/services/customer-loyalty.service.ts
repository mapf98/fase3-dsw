import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Product } from '../../products/entities/product.entity';
import { CURRENCY } from '../../../config/constants';
import { CustomerLoyaltyActions } from '../enums/customer-loyalty-actions.enum';
import { CustomerLoyaltyItems } from '../interfaces/customer-loyalty-items';
import { CustomerLoyaltyAccumulatePoints } from '../interfaces/customer-loyalty-accumulate-points';
import { CustomerLoyaltyRepository } from '../repositories/customer-loyalty.repository';
import { User } from '../../users/entities/user.entity';
import {
    CustomerLoyaltyAssociateUser,
    CustomerLoyaltyAssociateUserResponse,
    CustomerLoyaltyAssociateUserCodeResponse,
} from '../interfaces/customer-loyalty-associate-user.interface';
import { CustomerLoyaltyStatus } from '../enums/customer-loyalty-status.enum';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class CustomerLoyaltyService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly customerLoyaltyRepository: CustomerLoyaltyRepository,
        private readonly usersService: UsersService,
    ) {}

    /**
     *
     * @param products list of products to accumulate tentative points
     * @param token user token
     */
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

            const productsAccumulatedPoints = await this.customerLoyaltyRepository.accumulatePoints(
                request,
                token,
            );

            return this.addPointsToProductItems(products, productsAccumulatedPoints.request.products);
        }

        return products;
    }

    /**
     *
     * @param products list of products to add tentative points
     * @param productsAccumulatedPoints list of products with tentative points
     */
    private addPointsToProductItems(products, productsAccumulatedPoints) {
        return products.map(i => {
            if (i.canAccumulatePoints) {
                const itemFound = productsAccumulatedPoints.find(j => j.id === `${i.id}`);
                i.tentativePoints = itemFound.tentativePoints;
            }
            return i;
        });
    }

    /**
     * Authenticates the user in PetroMiles with the email provided
     * @param user user to authenticate in PetroMiles
     * @returns Promise<CustomerLoyaltyAssociateUserResponse>
     */
    public async authorize(user: Partial<User>): Promise<CustomerLoyaltyAssociateUserResponse> {
        this.logger.debug(`authorize: authorizing user [user=${JSON.stringify(user)}]`, {
            context: UsersService.name,
        });

        if (user === undefined) {
            throw new BadRequestException('Email attribute is required');
        }

        const request: CustomerLoyaltyAssociateUser = {
            apiKey: process.env.PETROMILES_API_KEY,
            userEmail: user.fidelityUserEmail,
        };

        const authorizeResponse: CustomerLoyaltyAssociateUserResponse = await this.customerLoyaltyRepository.authorize(
            request,
        );

        if (authorizeResponse.responseStatus === CustomerLoyaltyStatus.SUCCESSFUL) {
            return authorizeResponse;
        }

        throw new BadRequestException('The email provided is invalid');
    }

    /**
     * Validates email and userCode with PetroMiles
     * @param user user to be verified in PetroMiles
     * @returns Partial<User & Partial<CustomerLoyaltyAssociateUser>>
     */
    public async authorizeCode(
        user: Partial<User & Partial<CustomerLoyaltyAssociateUser>>,
    ): Promise<Partial<User & Partial<CustomerLoyaltyAssociateUser>>> {
        this.logger.debug(`authorizeCode: validating userCode [user=${JSON.stringify(user)}]`, {
            context: UsersService.name,
        });

        const request: CustomerLoyaltyAssociateUser = {
            apiKey: process.env.PETROMILES_API_KEY,
            userEmail: user.fidelityUserEmail,
            userCode: user.userCode,
        };

        const authorizeResponse: CustomerLoyaltyAssociateUserCodeResponse = await this.customerLoyaltyRepository.authorizeCode(
            request,
        );

        if (authorizeResponse.userToken) {
            user.loyaltySystemToken = authorizeResponse.userToken;
            await this.usersService.updateUser(user);
            return user;
        }
    }
}
