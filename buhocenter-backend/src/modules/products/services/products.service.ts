import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { ProductRating } from '../entities/product-rating.entity';
import { STATUS } from '../../../config/constants';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(ProductRating)
        private readonly productRatingsRepository: Repository<ProductRating>,
    ) {}

    async getProductAverageRating(products: Product[]): Promise<void> {
        for await (const product of products) {
            product.productRatings = await this.productRatingsRepository.query(`
                SELECT ROUND(AVG(CP.calificacion)) as rating
                FROM calificacion_producto CP
                WHERE CP.producto_id = ${product.id}
            `.trim())

            this.logger.debug(`getProductAverageRating [id=${product.id}|productRatings=${
                JSON.stringify(product.productRatings)}]`);
        }
    }

    async getProducts(page: number = 1, catalogueId: number = 1): Promise<[Product[], number]> {
        this.logger.debug(`getProducts: [page=${page}]`, { context: ProductsService.name });
        
        const take: number = 8;

        let [products, total]: [Product[], number] = await this.productsRepository.findAndCount({
            where: `catalogue.id = ${catalogueId} AND status.id = ${STATUS.ACTIVE.id}`,
            join: {
                alias: 'products',
                innerJoinAndSelect: {
                    productPhotos: 'products.productPhotos',
                    provider: 'products.provider',
                    productCategories: 'products.productCategories',
                    productCatalogues: 'productCategories.productCatalogues',
                    catalogue: 'productCatalogues.catalogue',
                    status: 'products.status'
                },
            },
            order: {
                id: 'ASC',
            },
            skip: take * (page - 1),
            take,
        });

        await this.getProductAverageRating(products);

        return [products, total];
    }
}
