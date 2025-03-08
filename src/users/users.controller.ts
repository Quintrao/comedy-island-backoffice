import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.usersService.getAllUsers();
    if (!users.length) {
      return 'No users found';
    }
    return users;
  }

  @Post('create-dummy-user')
  createDummyUser() {
    return this.usersService.createUser({
      name: 'Alice',
      email: 'dummy@email.com',
      notes: 'This is a dummy user',
    });
  }
}
