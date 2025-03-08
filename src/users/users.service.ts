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
}
