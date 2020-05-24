import { HttpRepository } from '@/http/http.repository';

class CataloguesHttpRepository extends HttpRepository {
    private static readonly RESOURCE = 'categories';

    public getCataloguesByCategory(categoryId: string) {
        return this.get(this.createUri([`${CataloguesHttpRepository.RESOURCE}/catalogues?category_id=${categoryId}`]));
    }
}

export default new CataloguesHttpRepository();