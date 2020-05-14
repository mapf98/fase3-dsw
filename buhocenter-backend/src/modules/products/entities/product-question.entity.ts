import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Product } from '../../products/entities/product.entity';
import { Customer } from '../../users/entities/customer.entity';

@Entity({ name: 'pregunta_producto' }) 
export class ProductQuestion extends BaseEntity {
	
	@Column({ name: 'comentario', type: 'text', nullable: false })
	comment: string;

	@JoinColumn({ name: 'producto_id' })
	@ManyToOne(type => Product , product => product.questions)
	product: Product;

	@JoinColumn({ name: 'cliente_id' })
	@ManyToOne(type => Customer, customer => customer.productQuestions)
	customer: Customer;
}
