import {Repository} from 'typeorm';
import {Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {WINSTON_MODULE_PROVIDER} from 'nest-winston';
import {Logger} from 'winston';
import {Category} from '../entities/category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) {}

    /**
     * Obtiene el listado de categorias
     */
    public async getCategories(): Promise<any> {
        try {
            this.logger.debug(`getCategories: ejecutando query para obtener categorias`, { context: CategoriesService.name });
            return await this.categoriesRepository.find();
        } catch (e) {
            this.logger.error(`getCategories: catch error [error:${e.message}]`, { context: CategoriesService.name });
            return Response.error();
        }
    }

    /**
     * Obtiene el listado de categorias
     */
    public async getCataloguesByCatergory(id: number): Promise<Response> {
        try {
            this.logger.debug(`getCataloguesByCatergory: ejecutando query para obtener catalogos por categoria`, { context: CategoriesService.name });
            return await this.categoriesRepository.query(`
            SELECT ca.id AS id, ca.nombre AS name
            FROM catalogo ca, producto_catalogo pctlg, producto_categoria pctgr
            WHERE ca.id = pctlg.catalogo_id
                AND pctlg.producto_categoria_id = pctgr.id
                AND pctgr.category_id = ${id}
            UNION
            SELECT ca.id AS id, ca.nombre AS name
            FROM catalogo ca, servicio_catalogo pctlg, servicio_categoria pctgr
            WHERE ca.id = pctlg.catalogo_id
                AND pctlg.servicio_categoria_id = pctgr.id
                AND pctgr.categoria_id = ${id}
            `.trim());
        } catch (e) {
            this.logger.error(`getCataloguesByCatergory: catch error [error:${e.message}]`, { context: CategoriesService.name });
            return Response.error();
        }
    }

}
