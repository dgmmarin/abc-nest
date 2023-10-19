import { Role } from "src/components/roles/entities/role.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';
@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'uuid', unique: true, nullable: false, generated: 'uuid', length: 50 })
    uuid: string;

    @Column({ name: 'first_name', length: 50 })
    firstName: string;

    @Column({ name: 'last_name', length: 50 })
    lastName: string;

    @Column({ name: 'email', length: 50, unique: true, nullable: false })
    email: string;

    @Column({ name: 'phone_number', length: 50, unique: true})
    phoneNumber: string;

    @Column({ name: 'password', length: 250, nullable: false })
    password: string;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at', })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @ManyToMany(() => Role)
    @JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'user_id',
        },
        inverseJoinColumn: {
            name: 'role_id',
        },
    })
    roles: Role[];
}
