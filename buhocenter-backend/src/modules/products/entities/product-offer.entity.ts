import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Offer } from './offer.entity';
import { Product } from './product.entity';

@Entity('producto_oferta') 
export class ProductOffer extends BaseEntity {
	@Column({ name: 'fecha_inicio', nullable: false })
	startDate: Date;

	@Column({ name: 'fecha_fin', nullable: false })
	endDate: Date;

	@Column({ name: 'precio_descuento', type: 'integer', nullable: false })
	discountPrice: number;	

	@JoinColumn({ name: 'oferta_id' })
	@ManyToOne(type => Offer, offer => offer.productOffers)
	offer: Offer;

	@JoinColumn({ name: 'producto_id' })
	@ManyToOne(type => Product, product => product.productOffers)
	product: Product;
}
