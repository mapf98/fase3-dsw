import { Entity, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { ProductOffer } from './product-offer.entity';
import { ServiceOffer } from '../../services/entities/service-offer.entity';
import { Status } from '../../status/entities/status.entity';


@Entity('oferta') 
export class Offer extends BaseEntity {
	
	@Column({ name: 'nombre', type: 'text', nullable: true })
	name: string;

	@Column({ name: 'descripcion', type: 'text', nullable: true })
	description: string;

	@OneToMany(type => ProductOffer, productOffers => productOffers.offer)
	productOffers: ProductOffer[];

	@OneToMany(type => ServiceOffer, serviceOffers => serviceOffers.offer)
	serviceOffers: ServiceOffer[];

	@JoinColumn({ name: 'estatus_id' })
	@ManyToOne(type => Status, status => status.offers)
	status: Status;
}
