import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../app/entities/base-entity';
import { Customer } from './customer.entity';

@Entity('lenguaje')
export class Language extends BaseEntity {
    @Column({ name: 'iso', type: 'varchar', length: 4, nullable: false })
    iso: string;

    @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ name: 'bandera', type: 'varchar', length: 250, nullable: true })
    flag: string;

    @OneToMany(type => Customer, customers => customers.language)
    customers: Customer[];
}
