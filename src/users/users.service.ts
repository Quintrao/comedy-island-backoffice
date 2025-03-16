import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers() {
    return this.prismaService.user.findMany();
  }

  async createUser(data: { name: string; email: string; notes?: string }) {
    return this.prismaService.user.create({ data });
  }

  async getUserBookingsById(id: number) {
    return this.prismaService.user.findUnique({ where: { id } }).bookings();
  }

  async getUserOrCreateNew(data: {
    name: string;
    email: string;
    notes?: string;
  }) {
    const user = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });
    if (user) {
      return user;
    }
    return this.prismaService.user.create({ data });
  }
}
