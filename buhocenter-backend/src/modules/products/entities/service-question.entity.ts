import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Service } from './service.entity';
import { Customer } from '../../users/entities/customer.entity';

@Entity({ name: 'pregunta_servicio' }) 
export class ServiceQuestion extends BaseEntity {
	
	@Column({ name: 'descripcion', type: 'varchar', length: 100, nullable: true })
	description: string;

	@Column({ name: 'fecha', nullable: false})
	date: Date;	

	@JoinColumn({ name: 'cliente_id' })
	@ManyToOne(type => Customer , customer => customer.serviceQuestions)
	customer: Customer;

	@JoinColumn({ name: 'servicio_id' })
	@ManyToOne(type => Service, service => service.questions)
	service: Service;
}
