import { Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('user-bookings/:id')
  async getUserBookingsById(@Param('id') id: string) {
    const idNumber = parseInt(id, 10);
    if (!idNumber) {
      const allUsers = await this.usersService.getAllUsers();
      const allUsersWithBookings = allUsers.map(async (user) => {
        const bookings = await this.usersService.getUserBookingsById(user.id);
        return { ...user, bookings };
      });
      return allUsersWithBookings;
    }
    const bookings = await this.usersService.getUserBookingsById(idNumber);
    return {
      bookings,
      bookingsCount: bookings.length,
    };
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
