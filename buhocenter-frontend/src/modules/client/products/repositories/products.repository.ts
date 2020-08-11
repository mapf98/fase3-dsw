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
import products from '@/store/products/products';

class ProductsHttpRepository extends HttpRepository {
    private static readonly RESOURCE = 'products';
    private static readonly RESOURCERATING = 'product-ratings';

    public getProducts(filter: Filter): Promise<Products> {
        return this.get(`${ProductsHttpRepository.RESOURCE}?` + filter.get(), this.createHeader());
    }

    public getProductById(id: number): Promise<Product> {
        return this.get(this.createUri([`${ProductsHttpRepository.RESOURCE}`, `${id}`]), this.createHeader());
    }

    public updateProductData(product: ProductCreate) {
        return this.put(this.createUri([`${ProductsHttpRepository.RESOURCE}`]), product, this.createHeader());
    }

    getAllProducts(): Promise<Products> {
        return this.get(this.createUri([`${ProductsHttpRepository.RESOURCE}`, 'all']));
    }
    //tipar

    public deleteProducts(id: number) {
        return this.delete(this.createUri([`${ProductsHttpRepository.RESOURCE}`, `${id}`], false), false);
    }

    public async getProductsDailyRecommendation(): Promise<Product[]> {
        return await this.get(
            this.createUri([`${ProductsHttpRepository.RESOURCE}`, `daily-recommendation`]),
            this.createHeader(),
        );
    }

    public createProduct(product: ProductCreate) {
        return this.post(
            this.createUri([`${ProductsHttpRepository.RESOURCE}`]),
            product,
            this.createHeader(),
        );
    }

    public createProductRating(productRating: ProductRatingCreate) {
        return this.post(this.createUri([`${ProductsHttpRepository.RESOURCERATING}`]), productRating);
    }
}

export default new ProductsHttpRepository();
