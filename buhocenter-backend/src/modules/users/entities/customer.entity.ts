import { Entity,Column,ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Status } from '../../app/entities/status.entity';
import { Role } from './role.entity';
import { ProductRating } from '../../social-intractions/entities/product-rating.entity';
import { ServiceQuestion } from '../../social-intractions/entities/service-question.entity';
import { Cart } from '../../products/entities/cart.entity';
import { ServiceRating } from '../../social-intractions/entities/service-rating.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Platform } from '../../platform-management/entities/platform.entity';
import { ProductQuestion } from '../../social-intractions/entities/product-question.entity';
import { Address } from './address.entity';

@Entity({ name: 'cliente' }) 
export class Customer extends BaseEntity {

	@Column({ name: 'primer_nombre', type: 'varchar', length: 100, nullable: false })
	name: string;

	@Column({ name: 'primer_apellido', type: 'varchar', length: 100, nullable: false })
	lastName: string;

	@Column({ name: 'fecha_nacimiento', nullable: false })
	birthdate: Date;

	@JoinColumn({ name: 'estatus_id' })
	@ManyToOne(type => Status, status => status.customers)
	status: Status;

	@JoinColumn({ name: 'rol_id' })
	@OneToOne(type => Role, role => role.customer)
	role: Role;

	@OneToMany(type => Address, addresses => addresses.customer)
	addresses: Address[];

	@OneToMany(type => ProductRating, productRatings => productRatings.customer)
	productRatings: ProductRating[];

	@OneToMany(type => ServiceQuestion, serviceQuestions => serviceQuestions.customer)
	serviceQuestions: ServiceQuestion[];

	@OneToMany(type => Cart, carts => carts.customer)
	carts: Cart[];

	@OneToMany(type => ServiceRating, serviceRatings => serviceRatings.customer)
	serviceRatings: ServiceRating[];

	@OneToMany(type => Notification, notifications => notifications.customer)
	notifications: Notification[];

	@OneToMany(type => Platform, platforms => platforms.customer)
	platforms: Platform[];

	@OneToMany(type => ProductQuestion, productQuestions => productQuestions.customer)
	productQuestions: ProductQuestion[];
}
