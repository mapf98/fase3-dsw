import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Service } from './service.entity';
import { Offer } from './offer.entity';

@Entity({ name: 'servicio_oferta' }) 
export class ServiceOffer extends BaseEntity {
	
	@Column({ name: 'precio_descuento', type: 'decimal', nullable: false })
	discountPrice: number;

	@Column({ name: 'porcentaje', type: 'decimal', nullable: true })
	percentage: number;

	@JoinColumn({ name: 'servicio_id' })
	@ManyToOne(type => Service, service => service.offers)
	service: Service;

	@JoinColumn({ name: 'oferta_id' })
	@ManyToOne(type => Offer, offer => offer.serviceOffers)
	offer: Offer;
}