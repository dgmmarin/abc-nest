import { IsNotEmpty } from "class-validator";

export class AddRoleDto {
    @IsNotEmpty()
    roleId: number;
  }