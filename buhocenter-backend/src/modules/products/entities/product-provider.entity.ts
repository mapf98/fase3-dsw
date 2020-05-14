import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Product } from './product.entity';
import { Provider } from './provider.entity';

@Entity({ name: 'proveedor_producto' }) 
export class ProductProvider extends BaseEntity {

	@JoinColumn({ name: 'producto_id' })
	@ManyToOne(type => Product, product => product.productProvider)
	product: Product;

	@JoinColumn({ name: 'proveedor_id' })
	@ManyToOne(type => Provider, provider => provider.productProviders)
	provider: Provider;
}
