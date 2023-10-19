import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializedUser } from 'src/serializers/user-entity/user-entity';
import { Public } from 'src/auth/constants';
import { AddRoleDto } from './dto/add-role.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Get()
  async findAll() {
    let users = await this.usersService.findAll();
    return users.map(user => new SerializedUser(user));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Post(':id/role')
  addRole(@Param('id', ParseIntPipe) id: number, @Body() addRole: AddRoleDto) {
    return this.usersService.addRole(id, addRole);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
