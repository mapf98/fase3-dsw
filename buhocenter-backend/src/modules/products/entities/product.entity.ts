import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Status } from '../../app/entities/status.entity';
import { Provider } from './provider.entity';
import { Brand } from './brand.entity';
import { ProductDimension } from './product-dimension.entity';
import { ProductRating } from './product-rating.entity';
import { ProductCatalogue } from './product-catalogue.entity';
import { ProductCategory } from './product-category.entity';
import { ProductOffer } from './product-offer.entity';
import { ProductCart } from './product-cart.entity';
import { ProductInventory } from './product-inventory.entity';
import { ProductPhoto } from './product-photo.entity';
import { ProductQuestion } from './product-question.entity';

@Entity({ name: 'producto' }) 
export class Product extends BaseEntity {
	@Column({ name: 'nombre', type: 'text', nullable: false })
	name: string;

	@Column({ name: 'descripcion', type: 'text', nullable: false })
	description: string;

	@Column({ name: 'precio', type: 'decimal', nullable: false })
	price: number;	

	@Column({ name: 'precio_envio', type: 'decimal', nullable: false })
	shippingPrice: number;	

	@JoinColumn({ name: 'estatus_id' })
	@ManyToOne(type => Status, status => status.products)
	status: Status;

	@JoinColumn({ name: 'proveedor_id' })
	@ManyToOne(type => Provider, provider => provider.product)
	provider: Provider;

	@JoinColumn({ name: 'marca_id' })
	@ManyToOne(type => Brand , brand => brand.products)
	brand: Brand;

	@OneToMany(type => ProductDimension, productDimensions => productDimensions.product)
	productDimensions: ProductDimension[];

	@OneToMany(type => ProductRating, productRatings => productRatings.product)
	productRatings: ProductRating[];

	@OneToMany(type => ProductCategory, productCategories => productCategories.product)
	productCategories: ProductCategory[];

	@OneToMany(type => ProductOffer, productOffers => productOffers.product)
	productOffers: ProductOffer[];

	@OneToMany(type => ProductCart, productCarts => productCarts.product)
	productCarts: ProductCart[];

	@OneToMany(type => ProductInventory, productInventories => productInventories.product)
	productInventories: ProductInventory[];

	@OneToMany(type => ProductPhoto, productPhotos => productPhotos.product)
	productPhotos: ProductPhoto[];

	@OneToMany(type => ProductQuestion, productQuestions => productQuestions.product)
	productQuestions: ProductQuestion[];
}