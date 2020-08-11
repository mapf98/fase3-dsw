import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { PrimalEntity } from '../../../app/entities/base-entity';
import { User } from '../../users/entities/user.entity';
import { Actions } from '../enums/actions.enum';

@Entity({ name: 'audit' })
export class Audit extends PrimalEntity {
    @Column({ name: 'transaction_id', type: 'text', nullable: false })
    transactionId: string;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(
        type => User,
        user => user.audit,
    )
    user: Partial<User>;
    
    @Column({ name: 'action', type: 'text', nullable: false })
    action: Actions;

    @Column({ name: 'row_id', type: 'int', nullable: false })
    rowId: number;

    @Column({ name: 'table_affected', type: 'text', nullable: false })
    tableAffected: string;
    
    @Column({ name: 'attribute_affected', type: 'text', nullable: true })
    attributeAffected: string;

    @Column({ name: 'old_value', type: 'text', nullable: true })
    oldValue: string;

    @Column({ name: 'new_value', type: 'text', nullable: true })
    newValue: string;

    @CreateDateColumn({ name: 'event_date' })
    eventDate: Date;
}
