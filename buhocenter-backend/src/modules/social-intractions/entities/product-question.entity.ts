import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Product } from '../../products/entities/product.entity';
import { Customer } from '../../users/entities/customer.entity';

@Entity({ name: 'pregunta_producto' }) 
export class ProductQuestion extends BaseEntity {
	
	@Column({ name: 'valoracion', type: 'varchar', length: 100, nullable: false })
	rating: string;

	@Column({ name: 'comentario', type: 'varchar', length: 100, nullable: false })
	comment: string;

	@Column({ name: 'fecha', nullable: false })
	date: Date;	

	@JoinColumn({ name: 'producto_id' })
	@ManyToOne(type => Product , product => product.productQuestions)
	product: Product;

	@JoinColumn({ name: 'cliente_id' })
	@ManyToOne(type => Customer, customer => customer.productQuestions)
	customer: Customer;
}
