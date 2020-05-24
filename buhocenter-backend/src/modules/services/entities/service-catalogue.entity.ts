import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Catalogue } from '../../products/entities/catalogue.entity';
import { Service } from './service.entity';
import { ServiceCategory } from './service-category.entity';

@Entity({ name: 'servicio_catalogo' })
export class ServiceCatalogue extends BaseEntity {

	@JoinColumn({ name: 'catalogo_id' })
	@ManyToOne(type => Catalogue, catalogue => catalogue.serviceCatalogues)
	catalogue: Catalogue;

	@JoinColumn({ name: 'servicio_categoria_id' })
	@ManyToOne(type => ServiceCategory, serviceCategory => serviceCategory.serviceCatalogues)
	serviceCategory: ServiceCategory;
}