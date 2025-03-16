import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class BookingsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async getAllBookingsByEventId(eventId: number) {
    return this.prisma.booking.findMany({
      where: {
        eventId,
      },
    });
  }

  async createBooking(data: { userId: number; eventId: number }) {
    const booking = await this.prisma.booking.create({
      data: {
        user: {
          connect: { id: data.userId },
        },
        event: {
          connect: { id: data.eventId },
        },
      },
    });
    return booking;
  }

  async createBookingByUserEmail(name: string, email: string, eventId: number) {
    const user = await this.usersService.getUserOrCreateNew({ name, email });
    return this.createBooking({ userId: user.id, eventId });
  }
}
