import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Status } from '../../app/entities/status.entity';
import { ServiceCart } from './service-cart.entity'
import { ServiceCatalogue } from './service-catalogue.entity';
import { ServiceCategory } from './service-category.entity';
import { ServiceOffer } from './service-offer.entity';
import { ServiceQuestion } from './service-question.entity';
import { ServiceRating } from './service-rating.entity';


@Entity({ name: 'servicio' }) 
export class Service extends BaseEntity {
	@Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
	name: string;

	@Column({ name: 'descripcion', type: 'varchar', length: 500, nullable: false })
	description: string;

	@Column({ name: 'precio', type: 'integer', nullable: false })
	price: number;	

	@JoinColumn({ name: 'estatus_id' })
	@ManyToOne(type => Status, status => status.services)
	status: Status;

	@OneToMany(type => ServiceCart, serviceCarts => serviceCarts.cart)
	serviceCarts: ServiceCart[];

	@OneToMany(type => ServiceRating, serviceRatings => serviceRatings.service)
	serviceRatings: ServiceRating[];

	@OneToMany(type => ServiceQuestion, serviceQuestions => serviceQuestions.service)
	serviceQuestions: ServiceQuestion[];

	@OneToMany(type => ServiceCatalogue, serviceCatalogues => serviceCatalogues.service)
	serviceCatalogues: ServiceCatalogue[];

	@OneToMany(type => ServiceCategory, serviceCategories => serviceCategories.service)
	serviceCategories: ServiceCategory[];

	@OneToMany(type => ServiceOffer, serviceOffers => serviceOffers.service)
	serviceOffers: ServiceOffer[];
}
