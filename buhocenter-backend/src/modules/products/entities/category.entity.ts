import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { ProductCategory } from './product-category.entity';
import { ServiceCategory } from './service-category.entity';

@Entity({ name: 'categoria' }) 
export class Category extends BaseEntity {
	
	@Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
	name: string;

	@OneToMany(type => ProductCategory, productCategories => productCategories.category)
    productCategories: ProductCategory[];

    @OneToMany(type => ServiceCategory, serviceCategories => serviceCategories.category)
    serviceCategories: ServiceCategory[];
}
