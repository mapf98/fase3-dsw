import { Entity, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { ProductOffer } from './product-offer.entity';
import { ServiceOffer } from './service-offer.entity';
import { Status } from 'src/modules/app/entities/status.entity';

@Entity('oferta') 
export class Offer extends BaseEntity {
	
	@Column({ name: 'nombre', type: 'text', nullable: true })
	name: string;

	@Column({ name: 'descripcion', type: 'text', nullable: true })
	description: string;

	@Column({ name: 'fecha_inicio', nullable: false })
	startDate: Date;

	@Column({ name: 'fecha_fin', nullable: false })
	endDate: Date;

	@OneToMany(type => ProductOffer, productOffers => productOffers.offer)
	productOffers: ProductOffer[];

	@OneToMany(type => ServiceOffer, serviceOffers => serviceOffers.offer)
	serviceOffers: ServiceOffer[];

	@JoinColumn({ name: 'estatus_id' })
	@ManyToOne(type => Status, status => status.offers)
	status: Status;
}
