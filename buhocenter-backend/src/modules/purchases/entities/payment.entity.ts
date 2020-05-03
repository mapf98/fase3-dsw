import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Checkout } from './checkout.entity';
import { CryptocurrencyGateway } from './cryptocurrency-gateway.entity';

@Entity('pago') 
export class Payment extends BaseEntity {
	@Column({ name: 'fecha', nullable: false })
	date: Date;

	@Column({ type: 'integer', nullable: false })
	total: number;

	@ManyToOne(type => Checkout, checkout => checkout.id)
	checkout: Checkout;

	@OneToMany(type => CryptocurrencyGateway, cryptocurrencyGateways => cryptocurrencyGateways.payment)
	cryptocurrencyGateways: CryptocurrencyGateway[];
}
