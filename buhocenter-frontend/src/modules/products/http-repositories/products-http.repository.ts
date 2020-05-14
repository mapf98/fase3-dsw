import { HttpRepository } from "@/http/http.repository";

class ProductsHttpRepository extends HttpRepository {
    private static readonly RESOURCE = 'products';

    getProducts(page: number, catalogueId: number = 1) {
        return this.get(this.createUri([`${ProductsHttpRepository.RESOURCE}`], { page, catalogueId }));
    }

    getProductById(id: number) {
        return this.get(this.createUri([`${ProductsHttpRepository.RESOURCE}`, `${id}`]));
    }
}

export default new ProductsHttpRepository();