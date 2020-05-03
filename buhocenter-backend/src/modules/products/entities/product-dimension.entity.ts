import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Dimension } from './dimension.entity';
import { Product } from './product.entity';

@Entity({ name: 'dimension_producto' }) 
export class ProductDimension extends BaseEntity {
	
	@Column({ name: 'valor', type: 'varchar', length: 100, nullable: false })
	value: string;

	@JoinColumn({ name: 'dimension_id' })
	@ManyToOne(type => Dimension, dimension => dimension.productDimensions)
	dimension: Dimension;

	@JoinColumn({ name: 'producto_id' })
	@ManyToOne(type => Product, product => product.productDimensions)
	product: Product;
}
