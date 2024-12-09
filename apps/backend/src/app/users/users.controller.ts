import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DynamicSwagger } from '../common/swagger.util';

@Controller('users')
@DynamicSwagger({ tag: 'Users', description: 'User management APIs' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @DynamicSwagger({ description: 'Create a new user' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @DynamicSwagger({ description: 'Get all users' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @DynamicSwagger({ description: 'Get user by ID' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @DynamicSwagger({ description: 'Update user by ID' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @DynamicSwagger({ description: 'Delete user by ID' })
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
