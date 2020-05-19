import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Service } from './service.entity';

@Entity({ name: 'foto_servicio' }) 
export class ServicePhoto extends BaseEntity {
	@Column({ name: 'contenido', type: 'varchar', length: 100, nullable: false })
	content: string;

	@JoinColumn({ name: 'servicio_id' })
	@ManyToOne(type => Service, service => service.photos)
	service: Service;
}
