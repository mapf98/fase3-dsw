import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ProductCatalogue } from '../entities/product-catalogue.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(ProductCatalogue)
        private readonly productCategoryRepository: Repository<ProductCatalogue>,
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) {}

    async getAllCategorys(): Promise<Category[]> {
        return await this.categoriesRepository.find();
    }

    public async getCategory(categoryId: number): Promise<Category> {
        return await this.categoriesRepository.findOne(categoryId);
    }

    public async createCategoryProduct(categoryId: number, product: Product) {
        this.logger.debug(
            `createCategoryProduct: the category ${categoryId} is alredy associated to the product ${product.id}`,
            { context: CategoriesService.name },
        );
        let newCategoryProduct = new ProductCatalogue();
        //! FIX: Ajustes en el modelo de la base de datos
        // newCategoryProduct.catalogue = await this.categoriesRepository.findOne(
        //     categoryId,
        // );
        this.logger.debug(`createCategoryProduct: ${JSON.stringify(newCategoryProduct.catalogue)}`, {
            context: CategoriesService.name,
        });
        newCategoryProduct.product = product;
        await this.productCategoryRepository.save(newCategoryProduct);
    }

    public async checkProductsCategories(categoryId: number, productId: number): Promise<boolean> {
        let productsCategories = await this.productCategoryRepository.find({
            where: { category: categoryId, product: productId },
        });

        if (productsCategories) {
            this.logger.info(
                `checkProductsCategories: the category ${categoryId} is alredy associated to the product ${productId}`,
                { context: CategoriesService.name },
            );
            return false;
        } else {
            return true;
        }
    }

    /**
     * Obtiene el listado de categorias
     */
    public async getCategories(): Promise<any> {
        try {
            this.logger.debug(`getCategories: executting query to get all categories`, {
                context: CategoriesService.name,
            });
            return await this.categoriesRepository.find();
        } catch (e) {
            this.logger.error(`getCategories: catch error [error:${e.message}]`, {
                context: CategoriesService.name,
            });
            return Response.error();
        }
    }

    /**
     * Obtiene el listado de categorias
     */
    public async getCataloguesByCatergory(id: number): Promise<Response> {
        try {
            this.logger.debug(
                `getCataloguesByCatergory: ejecutando query para obtener catalogues por category`,
                { context: CategoriesService.name },
            );
            return await this.categoriesRepository.query(
                `
            SELECT distinct ca.id AS id, ca.name AS name, ca.term AS term
            FROM catalogues ca, product_catalogues pctlg, categories cate
            WHERE ca.id = pctlg.catalogue_id 
                AND cate.id = ca.category_id               
                AND cate.id = ${id}
            `.trim(),
            );
        } catch (e) {
            this.logger.error(`getCataloguesByCatergory: catch error [error:${e.message}]`, {
                context: CategoriesService.name,
            });
            return Response.error();
        }
    }

    public async findCategory(categoryId: number): Promise<Category> {
        return await this.categoriesRepository.findOne(categoryId);
    }
}
