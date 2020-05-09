import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Customer } from './customer.entity';

@Entity({ name: 'rol' }) 
export class Role extends BaseEntity {
	
	@Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
	name: string;

	@Column({ name: 'prioridad', type: 'integer', nullable: false })
	priority: number;

	@OneToMany(type => Customer, customer => customer.role)
	customer: Customer;
}
