import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Service } from './service.entity';
import { Provider } from './provider.entity';

@Entity({ name: 'proveedor_servicio' }) 
export class ServiceProvider extends BaseEntity {

	@JoinColumn({ name: 'servicio_id' })
	@ManyToOne(type => Service, service => service.serviceProvider)
	services: Service;

	@JoinColumn({ name: 'proveedor_id' })
	@ManyToOne(type => Provider, provider => provider.serviceProviders)
	provider: Provider;
}
