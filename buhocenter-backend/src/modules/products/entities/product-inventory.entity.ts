import { Entity, Column, ManyToOne, JoinColumn, Check } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Product } from './product.entity';
import { Status } from '../../status/entities/status.entity';
import { Checkout } from '../../payments/entities/checkout.entity';

@Entity({ name: 'inventario_producto' }) 
export class ProductInventory extends BaseEntity {
	
	@Column({ name: 'cantidad_disponible', type: 'integer', nullable: false })
	availableQuantity: number;

	@JoinColumn({ name: 'producto_id' })
	@ManyToOne(type => Product, product => product.productInventories)
	product: Product;

	@JoinColumn({ name: 'status_id' })
	@ManyToOne(type => Status, status => status.productInventories)
	status: Status;	

	@JoinColumn({ name: 'checkout_id' })
	@ManyToOne(type => Checkout, checkout => checkout.productInventories, { nullable: true })
	checkout: Checkout;	
}
