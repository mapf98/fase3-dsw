import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { PlatformParameter } from './platform-parameter.entity';
import { Customer } from '../../users/entities/customer.entity';

@Entity({ name: 'plataforma' }) 
export class Platform extends BaseEntity {
	
	@Column({ name: 'contenido', type: 'varchar', length: 100, nullable: false })
	content: string;

	@Column({ name: 'fecha', nullable: false })
	date: Date;

	@JoinColumn({ name: 'cliente_id' })
	@ManyToOne(type => Customer, customer => customer.platforms)
	customer: Customer;

	@JoinColumn({ name: 'parametro_plataforma_id' })
	@ManyToOne(type => PlatformParameter, platformParameter => platformParameter.platforms)
	platformParameter: PlatformParameter;
}
