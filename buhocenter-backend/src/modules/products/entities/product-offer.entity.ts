import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Offer } from './offer.entity';
import { Product } from './product.entity';

@Entity('producto_oferta') 
export class ProductOffer extends BaseEntity {
	
	@Column({ name: 'precio_descuento', type: 'decimal', nullable: false })
	discountPrice: number;
	
	@Column({ name: 'porcentaje', type: 'decimal', nullable: true })
	percentage: number;

	@JoinColumn({ name: 'oferta_id' })
	@ManyToOne(type => Offer, offer => offer.productOffers)
	offer: Offer;

	@JoinColumn({ name: 'producto_id' })
	@ManyToOne(type => Product, product => product.offers)
	product: Product;
}
