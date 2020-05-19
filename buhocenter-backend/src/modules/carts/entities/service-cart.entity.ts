import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Service } from '../../services/entities/service.entity';
import { Cart } from './cart.entity';

@Entity('carrito_servicio') 
export class ServiceCart extends BaseEntity {
	
	@Column({ name: 'cantidad_producto', type: 'integer', nullable: false })
	quantity: number;

	@JoinColumn({ name: 'servicio_id' })
	@ManyToOne(type => Service, servicio => servicio.serviceCarts)
	service: Service;

	@JoinColumn({ name: 'carrito_id' })
	@ManyToOne(type => Cart, cart => cart.serviceCarts)
	cart: Cart;
}
