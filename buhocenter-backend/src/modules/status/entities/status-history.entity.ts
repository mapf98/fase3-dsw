import { Entity,Column,ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Checkout } from '../../purchases/entities/checkout.entity';
import { Status } from './status.entity'; 

@Entity({ name: 'historial_estatus' }) 
export class StatusHistory extends BaseEntity {
	
	@JoinColumn({ name: 'checkout_id' })
	@ManyToOne(type => Checkout, checkout => checkout.statusHistories)
	checkout: Checkout;

	@JoinColumn({ name: 'status_id' })
	@ManyToOne(type => Status, status => status.id)
	status: Status;
}
