import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Service } from '../../products/entities/service.entity';
import { Customer } from 'src/modules/users/entities/customer.entity';

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
	@ManyToOne(type => Service, service => service.serviceQuestions)
	service: Service;
}
