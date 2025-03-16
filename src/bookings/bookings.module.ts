import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, PrismaService, UsersService],
})
export class BookingsModule {}
