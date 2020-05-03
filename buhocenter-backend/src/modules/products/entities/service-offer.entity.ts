import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Service } from './service.entity';
import { Offer } from './offer.entity';

@Entity({ name: 'servicio_oferta' }) 
export class ServiceOffer extends BaseEntity {
	
	@Column({ name: 'fecha_inicio', nullable: false })
	startDate: Date;

	@Column({ name: 'fecha_fin', nullable: false })
	endDate: Date;

	@Column({ name: 'precio_descuento', type: 'integer', nullable: false })
	discountPrice: number;

	@JoinColumn({ name: 'servicio_id' })
	@ManyToOne(type => Service, service => service.serviceOffers)
	service: Service;

	@JoinColumn({ name: 'oferta_id' })
	@ManyToOne(type => Offer, offer => offer.serviceOffers)
	offer: Offer;
}