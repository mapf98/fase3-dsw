import { Entity,Column, ManyToOne, JoinColumn} from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Product } from './product.entity';
import { Customer } from '../../users/entities/customer.entity';

@Entity({ name: 'calificacion_producto' }) 
export class ProductRating extends BaseEntity {
	@Column({ name: 'calificacion', type: 'integer', nullable: false })
	rating: number;

	@Column({ name: 'comentario', type: 'text', nullable: false })
	comment: string;

	@Column({ name: 'fecha', nullable: true })
	date: Date;	

	@JoinColumn({ name: 'producto_id' })
	@ManyToOne(type => Product, product => product.productRatings)
	product: Product;

	@JoinColumn({ name: 'cliente_id' })
	@ManyToOne(type => Customer, customer => customer.productRatings)
	customer: Customer;
}


