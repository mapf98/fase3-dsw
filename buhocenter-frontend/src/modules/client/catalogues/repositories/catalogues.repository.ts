import { HttpRepository } from '@/http/http.repository';
import { Catalogues, ProductCatalogue } from '@/modules/client/catalogues/interfaces/catalogues.interface';

class CataloguesHttpRepository extends HttpRepository {
    private static readonly RESOURCE = 'categories';
    private static readonly RESOURCECATALOGUE = 'catalogues';

    public getCataloguesByCategory(categoryId: string): Promise<Catalogues> {
        return this.get(
            this.createUri([`${CataloguesHttpRepository.RESOURCE}/catalogues?category_id=${categoryId}`]),
        );
    }

    public getAllCatalogues(): Promise<Catalogues> {
        return this.get(this.createUri([`${CataloguesHttpRepository.RESOURCECATALOGUE}`]));
    }

    // VER TIPO DE RETORNO
    public saveCatalogue(data: ProductCatalogue) {
        return this.post(this.createUri([`${CataloguesHttpRepository.RESOURCECATALOGUE}`]), data, false);
    }

    public deleteCatalogue(data: number): Promise<boolean> {
        return this.delete(this.createUri([`${CataloguesHttpRepository.RESOURCECATALOGUE}`]), data);
    }
}

export default new CataloguesHttpRepository();
