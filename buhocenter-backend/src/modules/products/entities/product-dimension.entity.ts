import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Product } from './product.entity';

@Entity({ name: 'dimension_producto' }) 
export class ProductDimension extends BaseEntity {
	
	@Column({ name: 'ancho', type: 'varchar', length: 100, nullable: false })
	width: string;

	@Column({ name: 'alto', type: 'varchar', length: 100, nullable: false })
	height: string;

	@Column({ name: 'largo', type: 'varchar', length: 100, nullable: false })
	long: string;

	@JoinColumn({ name: 'producto_id' })
	@OneToOne(type => Product, product => product.productDimensions)
	product: Product;
}
