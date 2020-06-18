import { Entity, OneToMany, JoinColumn, ManyToOne, Column } from 'typeorm';
import { PrimalEntity } from '../../../app/entities/base-entity';
import { Payment } from './payment.entity';

@Entity('cryptocurrencies')
export class Cryptocurrency extends PrimalEntity {
    @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
    name: string;

    @OneToMany(
        type => Payment,
        payments => payments.cryptocurrency,
    )
    payments: Payment[];
}
