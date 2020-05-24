import { Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Category } from '../../products/entities/category.entity';
import { Service } from './service.entity';
import { ServiceCatalogue } from './service-catalogue.entity';

@Entity('servicio_categoria')
export class ServiceCategory extends BaseEntity {

	@JoinColumn({ name: 'categoria_id' })
	@ManyToOne(type => Category, category => category.serviceCategories)
	category: Category;

	@JoinColumn({ name: 'servicio_id' })
	@ManyToOne(type => Service, service => service.serviceCategories)
	service: Service;

	@OneToMany(type => ServiceCatalogue, serviceCatalogues => serviceCatalogues.serviceCategory)
	serviceCatalogues: ServiceCatalogue[];
}