import { Entity, Column, OneToMany} from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { ProductOffer } from './product-offer.entity';
import { ServiceOffer } from './service-offer.entity';

@Entity('oferta') 
export class Offer extends BaseEntity {
	
	@Column({ name: 'cantidad_oferta', type: 'integer', nullable: false })
	offerQuantity: number;

	@Column({ name: 'porcentaje', type: 'integer', nullable: true })
	percentage: number;

	@OneToMany(type => ProductOffer, productOffers => productOffers.offer)
	productOffers: ProductOffer[];

	@OneToMany(type => ServiceOffer, serviceOffers => serviceOffers.offer)
	serviceOffers: ServiceOffer[];
}
