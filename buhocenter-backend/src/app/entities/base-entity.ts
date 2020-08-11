import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export class PrimalEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date;
}
