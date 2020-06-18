import { createQueryBuilder, Repository, UpdateResult, EntityManager } from 'typeorm';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../products/entities/product.entity';
import { Cart } from '../entities/cart.entity';
import { User } from '../../users/entities/user.entity';
import { CartProductDTO } from '../dto/cartProduct.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { STATUS } from '../../../config/constants';
import { ProductsService } from '../../products/services/products.service';
import { UsersService } from '../../users/services/users.service';
import { StatusService } from '../../status/services/status.service';
import { Offer } from '../../products/entities/offer.entity';
import { Status } from '../../status/entities/status.entity';

@Injectable()
export class CartsService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @Inject(ProductsService)
        private readonly ProductsService: ProductsService,
        @Inject(UsersService)
        private readonly UsersService: UsersService,
        @Inject(StatusService)
        private readonly StatusService: StatusService,
    ) {}

    /**
     * Update the given cart with the status
     * @param cartId cart id to update
     * @param statusId status id which will be set to the provided cart
     */
    public async updateCartStatus(cartId: number, statusId: number): Promise<UpdateResult> {
        this.logger.debug(
            `updateCartStatus: updating cart status [cartId=${cartId}|statusId=${statusId}]`,
            { context: CartsService.name },
        );

        return this.cartRepository.update({ id: cartId }, { status: { id: statusId } });
    }

    /**
     * Finds the products inside the users Carts
     * @param serId cart id to update
     * @return Promise<Carts[]>
     */
    public async findCartUser(userId: number): Promise<Cart[]> {
        this.logger.debug(`findCartUser: [UserId = ${userId}]`, {
            context: CartsService.name,
        });

        let thisUser = await this.UsersService.getUsers(userId);

        let active = await this.StatusService.getStatus(STATUS.ACTIVE.id);

        return await this.cartRepository.find({
            where: { User: thisUser, status: active },
        });
    }

    /**
     * Associate a product and a cart by finding the products and User,and save it in the DB.
     * @params ProductRes, contains the details of the product wich will be associate to the User cart
     * @returns Promise<string>
     */
    public async asociateProductCart(ProductRes: CartProductDTO): Promise<string> {
        this.logger.debug(
            `asociateProductCart: saving product in costumer cart [productRes=${JSON.stringify(
                ProductRes,
            )}]`,
            { context: CartsService.name },
        );
        try {
            const findUser: User = await this.UsersService.findUser(ProductRes.user.id);
            const findProduct: Product = await this.ProductsService.findProduct(
                ProductRes.product.id,
            );

            const newProductCart: Cart = new Cart();
            let active = await this.StatusService.getStatus(STATUS.ACTIVE.id);
            let productQuantity: number = parseInt(ProductRes.quantity);
            newProductCart.quantity = productQuantity;
            newProductCart.productPrice = findProduct.price;
            newProductCart.user = findUser;
            newProductCart.status = active;
            newProductCart.product = findProduct;

            let productOffer: Offer = await this.ProductsService.findOffer(findProduct.offer);
            newProductCart.offerPrice =
                newProductCart.productPrice -
                (newProductCart.productPrice * productOffer.percentage) / 100;

            await this.cartRepository.save(newProductCart);
            this.logger.debug(`createProductCart: product associate to users cart`, {
                context: CartsService.name,
            });

            return 'product associated succesfully';
        } catch (e) {
            this.logger.error(
                `createProductCart: error when trying to product associate to users cart([error= ${JSON.stringify(
                    e.message,
                )}])`,
                { context: CartsService.name },
            );
            throw new BadRequestException('error saving product in the users cart');
        }
    }

    /**
     * Returns the products with its saved items
     * @param UserId current logged in User id
     * @return Promise<Cart[]>
     */
    async findCartProduct(UserId: number): Promise<any> {
        this.logger.debug(`findCartProduct: [UserId=${UserId}]`, {
            context: CartsService.name,
        });

        let cart: Cart[] = await this.cartRepository.find({
            where: `User_id = ${UserId}`,
            relations: [
                'product',
                'product.status',
                'product.productPhotos',
                'product.provider',
                'product.offer',
            ],
        });
        //cart = await this.cleanStatusOfferProducts(cart);
        cart = cart.filter(
            i => i.product && i.product.status && i.product.status.id !== STATUS.INACTIVE.id,
        );
        return cart;
    }

    async dropProductCart(productCartId: number): Promise<boolean> {
        this.logger.debug(`deleteProductCart: deleting productCart by id [id=${productCartId}]`, {
            context: CartsService.name,
        });
        const productCartResponse = await this.cartRepository.delete(productCartId);
        return !!productCartResponse;
    }

    cleanStatusOfferProducts(productsCart: any): any {
        this.logger.debug(
            `cleanStatusOfferProducts: [productsCart=${JSON.stringify(productsCart)}]`,
            { context: CartsService.name },
        );

        const cleanProductsCartOffer: any[] = [];
        productsCart.map((productCart, index) => {
            const product = productCart.product;
            // tslint:disable-next-line:no-shadowed-variable
            const offer = product.offers.find(offer => offer.id === STATUS.ACTIVE.id);
            delete product.offers;
            if (offer) {
                product.offer = offer;
            } else {
                product.offer = false;
            }
            productCart.product = product;
            cleanProductsCartOffer.push(productCart);
        });

        return cleanProductsCartOffer;
    }
}
