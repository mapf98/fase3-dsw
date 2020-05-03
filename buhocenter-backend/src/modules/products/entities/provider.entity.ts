import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Product } from './product.entity';

@Entity({ name: 'proveedor' }) 
export class Provider extends BaseEntity {

	@Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
	name: string;

	@OneToMany(type => Product, product => product.id)
	product: Product[];
}
