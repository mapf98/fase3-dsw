import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Status } from '../../status/entities/status.entity';
import { ServiceCart } from './service-cart.entity';
import { Customer } from '../../users/entities/customer.entity';
import { ProductCart } from './product-cart.entity';
import { Checkout } from '../../purchases/entities/checkout.entity';

@Entity('carrito') 
export class Cart extends BaseEntity {

	@JoinColumn({ name: 'cliente_id' })
	@ManyToOne(type => Customer, customer => customer.carts)
	customer: Customer;

	@JoinColumn({ name: 'estatus_id' })
	@ManyToOne(type => Status, status => status.carts)
	status: Status;

	@OneToMany(type => ServiceCart, serviceCarts => serviceCarts.cart)
	serviceCarts: ServiceCart[];

	@OneToMany(type => ProductCart, productCarts => productCarts.cart)
	productCarts: ProductCart[];

	@OneToMany(type => Checkout, checkouts => checkouts.cart)
	checkouts: Checkout[];
}
