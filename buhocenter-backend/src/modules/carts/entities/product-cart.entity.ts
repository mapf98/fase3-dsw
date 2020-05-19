import { Entity,Column,ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Product } from '../../products/entities/product.entity';
import { Cart } from './cart.entity';

@Entity({ name: 'carrito_producto' }) 
export class ProductCart extends BaseEntity {
	
	@Column({ name: 'cantidad', type: 'integer', nullable: false })
	quantity: number;

	@JoinColumn({ name: 'producto_id' })
	@ManyToOne(type => Product , product => product.productCarts)
	product: Product;

	@JoinColumn({ name: 'carrito_id' })
	@ManyToOne(type => Cart, cart => cart.productCarts)
	cart: Cart;
}
