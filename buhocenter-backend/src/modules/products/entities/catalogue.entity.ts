import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { ServiceCatalogue } from '../../services/entities/service-catalogue.entity';
import { ProductCatalogue } from './product-catalogue.entity';

@Entity('catalogo') 
export class Catalogue extends BaseEntity {
	
	@Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
	name: string;

	@Column({name: 'descripcion', type: 'varchar', length: 100, nullable: true })
	description: string;

	@Column({name: 'term', type: 'varchar', length: 100, nullable: true })
	term: string;

	@OneToMany(type => ServiceCatalogue, serviceCatalogues => serviceCatalogues.catalogue)
	serviceCatalogues: ServiceCatalogue[];

	@OneToMany(type => ProductCatalogue, productCatalogues => productCatalogues.catalogue)
	productCatalogues: ProductCatalogue[];
}
