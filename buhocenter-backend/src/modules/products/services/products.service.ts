import { createQueryBuilder, Repository, EntityManager, UpdateResult} from 'typeorm'
import { Injectable, Inject} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from '../entities/product.entity'
import { Customer } from '../../users/entities/customer.entity'
import { ProductDTO } from '../dto/products.dto'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { ProductRating } from '../entities/product-rating.entity';
import { ProductInventory } from '../entities/product-inventory.entity'
import { STATUS } from '../../../config/constants';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(ProductRating)
        private readonly productRatingsRepository: Repository<ProductRating>,
        @InjectRepository(ProductInventory)
        private readonly productInventoriesRepository: Repository<ProductInventory>,
    ) {}

    /**
     * Obtiene las valoraciones emitidas sobre un arreglo de productos
     * @param products arreglo de productos de los cuales se obtendrán las valoraciones
     */
    private async getProductAverageRating(products: Product[]): Promise<void> {
        for await (const product of products) {
            product.productRatings = await this.productRatingsRepository.query(`
            SELECT ROUND(AVG(CP.calificacion)) as rating, COUNT(*) as total
                FROM calificacion_producto CP
                WHERE CP.producto_id = ${product.id}
            `.trim())

            this.logger.debug(`getProductAverageRating [id=${product.id}|productRatings=${
                JSON.stringify(product.productRatings)}]`);
        }
    }

    /**
     * Obtiene la disponibilidad de un producto en el inventario
     * @param productId id del producto del cual se quiere obtener la disponibilidad en el inventario
     * @returns Promise<ProductInventory>
     */
    public async getProductInventoryAvailability(productId: number): Promise<ProductInventory> {
        this.logger.debug(`getProductInventoryAvailability: [productId=${productId}]`, { context: ProductsService.name });

        return this.productInventoriesRepository.findOne({
            where: `producto_id = ${productId} AND (status_id IN (${STATUS.REJECTED.id}, ${STATUS.PROCESSED.id}, ${STATUS.RESERVED.id})
                OR status_id IS NULL)`,
            order: {
                id: 'DESC',
            },
        })
    }

    public async getMinimumProductAvailable(productId: number): Promise<Product> {
        return this.productsRepository.findOne({
            where: { id: productId }
        })
    }

    public async updateProductInventorySetCheckout(
        productId: number,
        checkoutId: number,
        transactionalEntityManager: EntityManager,
    ): Promise<UpdateResult> {
        this.logger.debug(`updateProductInventorySetCheckout: [checkoutId=${
            checkoutId}|productId=${typeof productId}]`, { context: ProductsService.name });

        const productInventoryTransactionRepository: Repository<ProductInventory> = transactionalEntityManager.getRepository(
            ProductInventory,
        );

        const update= await productInventoryTransactionRepository.update({ product: { id: productId }}, { checkout: { id: checkoutId }});

        // console.log('update', update);

        return update;
    }

    public async updateProductInventoryWithCheckout(
        checkoutId: number,
        statusId: number,
        transactionalEntityManager: EntityManager,
    ): Promise<UpdateResult> {
        this.logger.debug(`updateProductInventoryWithCheckout: [checkoutId=${
            checkoutId}|statusId=${statusId}]`, { context: ProductsService.name });

        const productInventoryTransactionRepository: Repository<ProductInventory> = transactionalEntityManager.getRepository(
            ProductInventory,
        );

        return productInventoryTransactionRepository.update({ checkout: { id: checkoutId }}, { status: { id: statusId }});
    }

    public async updateProductInventory(
        productInventory,
        transactionalEntityManager: EntityManager,
    ): Promise<any> {
        this.logger.debug(`updateProductInventory: [productInventory=${
            JSON.stringify(productInventory)}]`, { context: ProductsService.name });

        const productInventoryTransactionRepository: Repository<ProductInventory> = transactionalEntityManager.getRepository(
            ProductInventory,
        );

        return productInventoryTransactionRepository.save(productInventory);
    }


    /**
     * Obtiene el producto por el id del producto
     * @param id id del producto
     */
    public async getProductById(id: number): Promise<Product> {
        this.logger.debug(`getProductById: [id=${id}]`, { context: ProductsService.name });

        const product: Product = await this.productsRepository.findOne({
            where: { id },
            relations: [
                'photos',
                'productProvider',
                'productProvider.provider',
                'productDimensions',
                'brand',
                'offers',
                'offers.offer',
                'offers.offer.status',
                'questions',
            ],
        });

        await this.getProductAverageRating([product]);

        product.productInventories = [await this.getProductInventoryAvailability(id)];

        return product;
    }

    /**
     * Obtiene el listado de productos de acuerdo a los parámetros recibidos
     * @param page página por la cual se desea empezar a listar los productos
     * @param catalogueId id del catálogo del cual se desean obtener los productos
     */
    public async getProducts(page: number = 1, catalogueId: number = 1): Promise<[Product[], number]> {
        this.logger.debug(`getProducts: [page=${page}|catalogueId=${catalogueId}]`, { context: ProductsService.name });
        
        const take: number = 8;

        let [products, total]: [Product[], number] = await this.productsRepository.findAndCount({
            where: `catalogue.id = ${catalogueId} AND status.id = ${STATUS.ACTIVE.id}`,
            join: {
                alias: 'products',
                innerJoinAndSelect: {
                    photos: 'products.photos',
                    productProvider: 'products.productProvider',
                    provider: 'productProvider.provider',
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

        let productsFiltered = [];

        for await (const i of products) {
            const inventoryAvailable = await this.getProductInventoryAvailability(i.id);

            if (inventoryAvailable.availableQuantity > i.minimumQuantityAvailable) {
                productsFiltered.push(i);
            }
        }

        await this.getProductAverageRating(productsFiltered);

        return [productsFiltered, total];
    }

    async findProduct(ProductID: number): Promise<Product> {
        return await this.productsRepository.findOne(ProductID);
    }

    /**
     * Obtiene el listado de productos recomendados del dia
     */
    public async getDailyProductsRecommendation(): Promise<Product[]> {
        this.logger.debug(`getDailyProductsRecommendation: ejecutando query`, { context: ProductsService.name });
        let products: Product[] = await this.productsRepository.find({
            where: `status.id = ${STATUS.ACTIVE.id}`,
            join: {
                alias: 'products',
                innerJoinAndSelect: {
                    photos: 'products.photos',
                    productProvider: 'products.productProvider',
                    provider: 'productProvider.provider',
                    productCategories: 'products.productCategories',
                    productCatalogues: 'productCategories.productCatalogues',
                    catalogue: 'productCatalogues.catalogue',
                    status: 'products.status',
                },
            },
        });

        await this.getProductAverageRating(products);
        products = this.randomProducts(products);
        return products;
    }

     randomProducts(products: Product[]): Product[] {
        const randomProducts = products.sort((a, b) => (Math.random() - 0.5));
        return [...randomProducts].slice(0, 5);
    }

}
