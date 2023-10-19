import { User } from "src/components/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'roles'})
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'uuid', unique: true, nullable: false, generated: 'uuid', length: 50})
    uuid: string;

    @Column({name: 'name', length: 50})
    name: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: Date;

    @ManyToMany(() => User)
    roles: User[];
}   
