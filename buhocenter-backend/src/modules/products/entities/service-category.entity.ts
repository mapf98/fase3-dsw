import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Category } from './category.entity';
import { Service } from './service.entity';

@Entity('servicio_categoria') 
export class ServiceCategory extends BaseEntity {

	@JoinColumn({ name: 'categoria_id' })
	@ManyToOne(type => Category, category => category.serviceCategories)
	category: Category;

	@JoinColumn({ name: 'servicio_id' })
	@ManyToOne(type => Service, service => service.serviceCategories)
	service: Service;
}
