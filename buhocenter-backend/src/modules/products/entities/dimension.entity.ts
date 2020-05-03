import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { ProductDimension } from './product-dimension.entity';

@Entity({ name: 'dimension' }) 
export class Dimension extends BaseEntity {
	
	@Column({ name: 'ancho', type: 'varchar', length: 100, nullable: false })
	width: string;

	@Column({ name: 'alto', type: 'varchar', length: 100, nullable: false })
	high: string;

	@Column({ name: 'largo', type: 'varchar', length: 100, nullable: false })
	long: string;

	@OneToMany(type => ProductDimension, productDimensions => productDimensions.dimension)
	productDimensions: ProductDimension[];
}
