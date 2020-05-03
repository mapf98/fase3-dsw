import { Entity,Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { CryptocurrencyGateway } from './cryptocurrency-gateway.entity';

@Entity('tipo_cryptomoneda') 
export class CryptocurrencyType extends BaseEntity {
	
	@Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
	nombre: string;

	@OneToMany(type => CryptocurrencyGateway, cryptocurrencyGateways => cryptocurrencyGateways.cryptocurrencyType)
	cryptocurrencyGateways: CryptocurrencyGateway[];
}
