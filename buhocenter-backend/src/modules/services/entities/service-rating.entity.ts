import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Service } from './service.entity';
import { Customer } from '../../users/entities/customer.entity';

@Entity({ name: 'calificacion_servicio' }) 
export class ServiceRating extends BaseEntity {
	
	@Column({ name: 'calificacion', type: 'integer', nullable: false })
	rating: number;

	@Column({ name: 'comentario', type: 'varchar', length: 500, nullable: true })
	comment: string;

	@Column({ name: 'fecha', nullable: false })
	date: Date;	

	@JoinColumn({ name: 'cliente_id' })
	@ManyToOne(type => Customer, customer => customer.serviceRatings)
	customer: Customer;

	@JoinColumn({ name: 'servicio_id' })
	@ManyToOne(type => Service, service => service.serviceRatings)
	service: Service;
}
