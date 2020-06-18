import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { PrimalEntity } from '../../../app/entities/base-entity';
import { Address } from '../../address/entities/address.entity';
import { Cryptocurrency } from './cryptocurrency.entity';
import { Commission } from './commission.entity';
import { ForeignExchange } from '../../users/entities/foreign-exchange.entity';
import { StatusHistory } from '../../status/entities/status-history.entity';
import { Cart } from '../../carts/entities/cart.entity';

@Entity('payments')
export class Payment extends PrimalEntity {
    @Column({ type: 'decimal', nullable: false })
    total: number;

    @Column({ name: 'total_cryptocurrency', type: 'decimal', nullable: false })
    totalCryptocurrency: number;

    @Column({ name: 'transaction_id', type: 'text', nullable: false })
    transaction: string;

    @JoinColumn({ name: 'address_id' })
    @ManyToOne(
        type => Address,
        address => address.payments,
        { nullable: false },
    )
    address: Address;

    @JoinColumn({ name: 'foreign_exchange_id' })
    @ManyToOne(
        type => ForeignExchange,
        foreignExchange => foreignExchange.payments,
        { nullable: false },
    )
    foreignExchange: ForeignExchange;

    @JoinColumn({ name: 'cryptocurrency_id' })
    @ManyToOne(
        type => Cryptocurrency,
        cryptocurrency => cryptocurrency.payments,
        { nullable: false },
    )
    cryptocurrency: Cryptocurrency;

    @JoinColumn({ name: 'commision_id' })
    @ManyToOne(
        type => Commission,
        commission => commission.payments,
        { nullable: false },
    )
    commission: Commission;

    @OneToMany(
        type => StatusHistory,
        statusHistories => statusHistories.payment,
    )
    statusHistories: StatusHistory[];

    @OneToMany(
        type => Cart,
        carts => carts.payment,
    )
    carts: Cart[];
}
