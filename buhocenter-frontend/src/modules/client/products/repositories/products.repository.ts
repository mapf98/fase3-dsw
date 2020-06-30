import { HttpRepository } from '@/http/http.repository';
import {
    Product,
    dimensionDto,
    ProductPhotoDto,
    ProductCreate,
    ProductRatingCreate,
    Products,
} from '../interfaces/products.interface';
import { Filter } from '@/utils/filter';

class ProductsHttpRepository extends HttpRepository {
    private static readonly RESOURCE = 'products';
    private static readonly RESOURCEDIMENSION = 'products/dimension';
    private static readonly RESOURCEIMAGE = 'products/image';
    private static readonly RESOURCEINVENTORY = 'products/inventory';
    private static readonly RESOURCERATING = 'product-ratings';

    public getProducts(filter: Filter): Promise<Products> {
        return this.get(`${ProductsHttpRepository.RESOURCE}?` + filter.get());
    }

    public getProductById(id: number): Promise<Product> {
        return this.get(this.createUri([`${ProductsHttpRepository.RESOURCE}`, `${id}`]));
    }
    //tipar
    updateProductData(product: ProductCreate) {
        return this.patch(this.createUri([`${ProductsHttpRepository.RESOURCE}`], false), product, false);
    }
    private static readonly RESOURCE_ALL = 'products/all/1';

    getAllProducts(): Promise<Product[]> {
        return this.get(this.createUri([`${ProductsHttpRepository.RESOURCE_ALL}`]));
    }
    //tipar

    public deleteProducts(id: number) {
        return this.delete(this.createUri([`${ProductsHttpRepository.RESOURCE}`, `${id}`], false), false);
    }

    public async getProductsDailyRecommendation(): Promise<Product[]> {
        return await this.get(this.createUri([`${ProductsHttpRepository.RESOURCE}`, `daily-recommendation`]));
    }

    public createProduct(product: ProductCreate) {
        return this.post(this.createUri([`${ProductsHttpRepository.RESOURCE}`]), product);
    }

    public uploadImage(data: ProductPhotoDto) {
        return this.post(this.createUri([`${ProductsHttpRepository.RESOURCEIMAGE}`]), data);
    }

    public createDimension(data: dimensionDto) {
        return this.post(this.createUri([`${ProductsHttpRepository.RESOURCEDIMENSION}`]), data);
    }
    public saveInventary(data) {
        return this.post(this.createUri([`${ProductsHttpRepository.RESOURCEINVENTORY}`]), data);
    }

    public updateInventory(data) {
        return this.patch(
            this.createUri([`${ProductsHttpRepository.RESOURCEINVENTORY}`], false),
            data,
            false,
        );
    }

    public createProductRating(productRating: ProductRatingCreate) {
        return this.post(this.createUri([`${ProductsHttpRepository.RESOURCERATING}`]), productRating);
    }
}

export default new ProductsHttpRepository();
