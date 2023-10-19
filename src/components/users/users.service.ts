import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SerializedUser } from 'src/serializers/user-entity/user-entity';
import { CreateRoleDto } from '../roles/dto/create-role.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(RolesService) private roleService: RolesService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hash = bcrypt.hashSync(createUserDto.password, 10);
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = hash;
    user.phoneNumber = createUserDto.phoneNumber;
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async findOne(id: number) {
    const usr = await this.userRepository.findOneOrFail({
      where: {
        id: id
      },
      relations: ['roles']
    });
    return new SerializedUser(usr);
  }

  async findOneByEmail(email: string) {
    const usr = await this.userRepository.findOneOrFail({
      where: {
        email: email,
      },
      relations: {
        roles: true,
      },
    });
    return usr;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const usr = await this.findOne(id);
    usr.email = updateUserDto.email ?? usr.email;
    usr.firstName = updateUserDto.firstName ?? usr.firstName;
    usr.lastName = updateUserDto.lastName ?? usr.lastName;
    return await this.userRepository.save(usr);
  }
  
  async addRole(id: number, addRole: AddRoleDto) {
    const usr = await this.findOne(id);
    const role = await this.roleService.findOne(addRole.roleId);
    usr.roles.push(role);
    return await this.userRepository.save(usr);
  }

  async remove(id: number) {
    return await this.userRepository.softDelete({ id: id });
  }

  async patch(id: number, updateUserDto: UpdateUserDto) {
    const usr = await this.findOne(id);
    usr.email = updateUserDto.email ?? usr.email;
    usr.firstName = updateUserDto.firstName ?? usr.firstName;
    usr.lastName = updateUserDto.lastName ?? usr.lastName;
    return await this.userRepository.save(usr);
  }
}
