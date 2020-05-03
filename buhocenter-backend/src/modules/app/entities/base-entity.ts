import { PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn({ name: 'fecha_creacion', nullable: true })
    createdAt: Date;
    
    @CreateDateColumn({ name: 'fecha_modificacion', nullable: true })
	updatedAt: Date;
}