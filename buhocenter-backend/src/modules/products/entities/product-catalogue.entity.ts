import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Catalogue } from './catalogue.entity';
import { Product } from './product.entity';
import { ProductCategory } from './product-category.entity';

@Entity('producto_catalogo') 
export class ProductCatalogue extends BaseEntity {
	
	@JoinColumn({ name: 'catalogo_id' })
	@ManyToOne(type => Catalogue , catalogue => catalogue.productCatalogues)
	catalogue: Catalogue;


	@JoinColumn({ name: 'producto_id' })
	@ManyToOne(type => Product, product => product.productCatalogues)
	product: Product;

	@JoinColumn({ name: 'producto_categoria_id' })
	@ManyToOne(type => ProductCategory, productCategory => productCategory.productCatalogues)
	productCategory: ProductCategory;

}
