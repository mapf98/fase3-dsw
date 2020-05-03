import { Entity,Column,ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Payment } from './payment.entity';
import { CryptocurrencyType } from './cryptocurrency-type.entity';

@Entity({ name: 'plat_cryptomoneda' }) 
export class CryptocurrencyGateway extends BaseEntity {
	@Column({ type: 'integer', nullable: false })
	total: number;

	@JoinColumn({ name: 'pago_id' })
	@ManyToOne(type => Payment, payment => payment.cryptocurrencyGateways)
	payment: Payment;

	@JoinColumn({ name: 'tipo_criptomoneda_id' })
	@ManyToOne(type => CryptocurrencyType , cryptocurrencyType => cryptocurrencyType.cryptocurrencyGateways)
	cryptocurrencyType: CryptocurrencyType;
}
