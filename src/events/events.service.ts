import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllEvents() {
    return this.prismaService.event.findMany();
  }

  async getEventBookingsById(id: number) {
    return this.prismaService.event.findUnique({ where: { id } }).bookings();
  }

  async getAllEventsWithBookings() {
    const allEvents = await this.getAllEvents();
    const allEventsWithBookings = await Promise.all(
      allEvents.map(async (event) => {
        const bookings = await this.getEventBookingsById(event.id);
        return { ...event, bookings };
      }),
    );
    return allEventsWithBookings;
  }

  async createEvent(data: { title: string; description: string; date: Date }) {
    return this.prismaService.event.create({ data });
  }
}
