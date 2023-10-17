import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'first_name', length: 50})
    firstName: string;

    @Column({name: 'last_name', length: 50})
    lastName: string;

    @Column({name: 'email', length: 50, unique: true, nullable: false})
    email: string;

    @Column({name: 'password', length: 250, nullable: false})
    password: string;

    @Column({name: 'is_active', default: true})
    isActive: boolean;

    @CreateDateColumn({name: 'created_at', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({name: 'deleted_at', nullable: true })
    deletedAt: Date;
}
