import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Product } from './product.entity';

@Entity({ name: 'inventario_producto' }) 
export class ProductInventory extends BaseEntity {
	
	@Column({ name: 'cantidad_disponible', type: 'integer', nullable: false })
	availableQuantity: number;

	@JoinColumn({ name: 'producto_id' })
	@ManyToOne(type => Product, product => product.productInventories)
	product: Product;	
}
