import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllEvents() {
    return this.prismaService.event.findMany();
  }

  async createEvent(data: { title: string; description: string; date: Date }) {
    return this.prismaService.event.create({ data });
  }

  async getEventBookingById(id: number) {
    return this.prismaService.event.findUnique({ where: { id } }).bookings();
  }
}
