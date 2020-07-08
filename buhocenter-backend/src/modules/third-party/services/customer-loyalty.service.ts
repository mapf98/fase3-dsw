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
import { CsvGenerator } from '../../documents/repositories/csv.generator';
import { ClientsCsvPetromilesInterface } from '../../documents/infraestructure/interfaces/clients-csv.petromiles.interface';
import { sendMock } from '../../documents/infraestructure/test/mocks/send.mock';
import { ReadStream } from 'fs';
import { Cart } from '../../carts/entities/cart.entity';
import { CustomerLoyaltyUpdateProductPoints } from '../interfaces/customer-loyalty-update-product-points';
import { ConfigKeys } from '../../../config/config.keys';
import { ConfigService } from '../../../config/config.service';

@Injectable()
export class CustomerLoyaltyService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly customerLoyaltyRepository: CustomerLoyaltyRepository,
        private readonly usersService: UsersService,
        private readonly csvGenerator: CsvGenerator,
        private readonly configService: ConfigService,
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
                this.logger.debug(
                    `getProductsAccumulatedPoints: product selected [id=${product.id}|price=${product.price}]`,
                    { context: CustomerLoyaltyService.name },
                );

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
                apiKey: this.configService.get(ConfigKeys.PETROMILES_API_KEY),
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
    private addPointsToProductItems(products, productsAccumulatedPoints): Product[] {
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
            context: CustomerLoyaltyService.name,
        });

        if (user === undefined) {
            throw new BadRequestException('Email attribute is required');
        }

        const request: CustomerLoyaltyAssociateUser = {
            apiKey: this.configService.get(ConfigKeys.PETROMILES_API_KEY),
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
            context: CustomerLoyaltyService.name,
        });

        const request: CustomerLoyaltyAssociateUser = {
            apiKey: this.configService.get(ConfigKeys.PETROMILES_API_KEY),
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

    /**
     * accumulatePoints
     * @param carts: Cart[]
     * @param token: string
     * @returns Promise<any>
     */
    async accumulatePoints(carts: Cart[], token: string): Promise<any> {
        this.logger.debug(`accumulatePoints: Accumulating points`, {
            context: CustomerLoyaltyService.name,
        });

        const items: CustomerLoyaltyItems[] = carts.map(cart => {
            return {
                id: `${cart.id}`,
                priceTag: parseFloat((cart.productPrice * 100).toFixed(0)),
                currency: CURRENCY.PRICE.toLowerCase(),
            };
        });

        const request: CustomerLoyaltyAccumulatePoints = {
            apiKey: this.configService.get(ConfigKeys.PETROMILES_API_KEY),
            type: CustomerLoyaltyActions.CREATION,
            products: items,
        };

        return await this.customerLoyaltyRepository.accumulatePoints(request, token);
    }

    /**
     * Sets the tentative points
     * @param userProducts contains the user object and a list of product items to set tentative
     * points
     * @returns Promise<Product[]>. List of products with the tentative points.
     */
    public async updateProductPoints(userProducts: CustomerLoyaltyUpdateProductPoints): Promise<Product[]> {
        const user: User | undefined = await this.usersService.getUserById(userProducts.user.id);

        if (user === undefined) {
            throw new NotFoundException('The userId provided is invalid');
        }

        return await this.getProductsAccumulatedPoints(userProducts.products, user.loyaltySystemToken);
    }
    
     /*
     * Validates if the user is member of the loyalty system
     * @param id user id to validate the associated account
     * @returns Promise<User>. User found and validated.
     */
    public async hasLoyaltyAssociatedAccount(id: number): Promise<User | boolean> {
        this.logger.debug(`hasLoyaltyAssociatedAccount: validating user [id=${id}]`, {
            context: CustomerLoyaltyService.name,
        });

        const user: User | undefined = await this.usersService.getUserById(id);

        if (user === undefined) {
            return false;
        }

        if (user.loyaltySystemToken && user.fidelityUserEmail) {
            return user;
        }

        return false;
    }

    /*
     * Generate csv with CSV generator
     * @returns Promise<ReadStream>
     */
    public async generateClientCsv(): Promise<ReadStream> {
        const data: ClientsCsvPetromilesInterface[] = sendMock;
        const fileName = `reports/csv/${new Date().toISOString()}.csv`;
        const file = this.csvGenerator.generate(data, fileName);
        const fileSent = await this.customerLoyaltyRepository.sendClientsCsv(file);
        return file;
    }

    /**
     * Download csv with CSV generator
     * @returns ReadStream>
     */
    public downloadClientCsv(fileName: string): ReadStream {
        return this.csvGenerator.read(fileName);
    }
}
