import { Entity, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Status } from '../../app/entities/status.entity';
import { Role } from './role.entity';
import { ProductRating } from '../../products/entities/product-rating.entity';
import { ServiceQuestion } from '../../products/entities/service-question.entity';
import { Cart } from '../../products/entities/cart.entity';
import { ServiceRating } from '../../products/entities/service-rating.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Platform } from '../../platform-management/entities/platform.entity';
import { ProductQuestion } from '../../products/entities/product-question.entity';

import { Address } from './address.entity';
import {Language} from "./language.entity";

@Entity({ name: 'cliente' }) 
export class Customer extends BaseEntity {

	@Column({ name: 'primer_nombre', type: 'varchar', length: 100, nullable: false })
	name: string;

	@Column({ name: 'primer_apellido', type: 'varchar', length: 100, nullable: false })
	lastName: string;

	@Column({ name: 'fecha_nacimiento', nullable: true })
	birthdate: Date;

	@Column({ name: 'uid', type: 'text', nullable: true })
	uid: string;

	@Column({ name: 'token', type: 'varchar', length: 200,  nullable: true })
	token: string;

	@JoinColumn({ name: 'estatus_id' })
	@ManyToOne(type => Status, status => status.customers)
	status: Status;

	@JoinColumn({ name: 'rol_id' })
	@ManyToOne(type => Role, role => role.customer)
	role: Role;

	@JoinColumn({ name: 'lenguaje_id' })
	@ManyToOne(type => Language, language => language.customers)
	language: Language;

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
