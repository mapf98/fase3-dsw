import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Catalogue } from './catalogue.entity';
import { Service } from './service.entity';

@Entity({ name: 'servicio_catalogo' }) 
export class ServiceCatalogue extends BaseEntity {
	
	@JoinColumn({ name: 'catalogo_id' })
	@ManyToOne(type => Catalogue, catalogue => catalogue.serviceCatalogues)
	catalogue: Catalogue;

	@JoinColumn({ name: 'servicio_id' })
	@ManyToOne(type => Service, service => service.serviceCatalogues)
	service: Service;
}
