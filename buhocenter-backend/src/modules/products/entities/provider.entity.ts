import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { ProductProvider } from './product-provider.entity';
import { ServiceProvider } from './service-provider.entity';

@Entity({ name: 'proveedor' }) 
export class Provider extends BaseEntity {

	@Column({ name: 'nombre', type: 'text', nullable: false })
	name: string;

	@OneToMany(type => ProductProvider, productProviders => productProviders.provider)
    productProviders: ProductProvider[];
    
    @OneToMany(type => ServiceProvider, serviceProviders => serviceProviders.provider)
	serviceProviders: ServiceProvider[];
}
