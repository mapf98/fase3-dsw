import { Entity,Column,ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Product } from './product.entity';

@Entity({ name: 'foto_producto' }) 
export class ProductPhoto extends BaseEntity {
	@Column({ name: 'contenido', type: 'varchar', length: 100, nullable: false })
	content: string;

	@JoinColumn({ name: 'producto_id' })
	@ManyToOne(type => Product, product => product.photos)
	product: Product;
}
