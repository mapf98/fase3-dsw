import { Entity,Column,ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Customer } from '../../users/entities/customer.entity';
import { Status } from '../../status/entities/status.entity';

@Entity({ name: 'direccion' })
export class Address extends BaseEntity {
	
	@Column({ name: 'primera_calle', type: 'varchar', nullable: false })
	firstStreet: string;

	@Column({ name: 'segunda_calle', type: 'varchar', nullable: true })
	secondStreet: string;

    @Column({ name: 'ciudad', type: 'varchar', nullable: false })
    city: string;
      
    @Column({ name: 'estado', type: 'varchar', nullable: false })
    state: string;

    @Column({ name: 'codigo_zip', type: 'varchar', nullable: false })
	zipcode: number;
	
	@Column({ name: 'direccion_default', type: 'boolean', nullable: true })
	setDefault: boolean;

	@JoinColumn({ name: 'cliente_id' })
	@ManyToOne(type => Customer, customer => customer.addresses)
	customer: Customer

	@JoinColumn({ name: 'estatus_id' })
	@ManyToOne(type => Status , status => status.addresses)
	status: Status;
}
