import { Entity, Column, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Cart } from '../../products/entities/cart.entity';
import { StatusHistory } from '../../app/entities/status-history.entity';

@Entity('checkout') 
export class Checkout extends BaseEntity {
	
	@Column({ name: 'descripcion', type: 'varchar', length: 100, nullable: false })
	description: string;

	@OneToOne(type => Cart, cart => cart.checkouts)
	cart: Cart;

	@OneToMany(type => StatusHistory, statusHistories => statusHistories.checkout)
	statusHistories: StatusHistory[];
}