import { Exclude } from "class-transformer";
import { Role } from "src/components/roles/entities/role.entity";
import { User } from "src/components/users/entities/user.entity";

export class SerializedUser {
    id: number;
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    @Exclude()
    isActive: boolean;
    @Exclude()
    password: string;    
    phoneNumber: string;
    roles: Role[];
    @Exclude()
    createdAt: Date;
    @Exclude()
    updatedAt: Date;
    @Exclude()
    deletedAt: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
