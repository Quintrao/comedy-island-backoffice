import { Body, Controller, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('create-booking-by-user-email')
  async createBookingByUserEmail(
    @Body() body: { name: string; email: string; eventId: number },
  ) {
    const { name, email, eventId } = body;
    if (!name || !email || !eventId) {
      return `Please provide a name, email, and event ID. Now you provided: ${name}, ${email}, ${eventId}`;
    }
    return this.bookingsService.createBookingByUserEmail(name, email, eventId);
  }
}
