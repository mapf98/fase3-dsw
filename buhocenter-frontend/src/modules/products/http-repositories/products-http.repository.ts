import { HttpRepository } from '@/http/http.repository';

class ProductsHttpRepository extends HttpRepository {
    private static readonly RESOURCE = 'products';

    public getProducts(page: number, catalogueId: number = 1) {
        return this.get(this.createUri([`${ProductsHttpRepository.RESOURCE}`], { page, catalogueId }));
    }

    public getProductById(id: number) {
        return this.get(this.createUri([`${ProductsHttpRepository.RESOURCE}`, `${id}`]));
    }

    public getProductsDailyRecommendation() {
        return this.get(this.createUri([`${ProductsHttpRepository.RESOURCE}`, `daily-recommendation`]));
    }
}

export default new ProductsHttpRepository();