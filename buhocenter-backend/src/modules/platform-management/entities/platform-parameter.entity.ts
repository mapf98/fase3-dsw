import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Platform } from './platform.entity';

@Entity({ name: 'parametro_plataforma' }) 
export class PlatformParameter extends BaseEntity {
	
	@Column({ type: 'varchar', length: 100, nullable: false })
	name: string;

	@OneToMany(type => Platform, platforms => platforms.platformParameter)
	platforms: Platform[];
}
