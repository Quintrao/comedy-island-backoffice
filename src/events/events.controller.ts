import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getEvents() {
    const events = await this.eventsService.getAllEvents();
    if (!events.length) {
      return 'No events found';
    }
    return events;
  }

  @Get('event-bookings')
  async getEventBookings() {
    return this.eventsService.getAllEventsWithBookings();
  }

  @Get('event-bookings/:id')
  async getEventBookingsById(@Param('id') id: string) {
    const idNumber = parseInt(id, 10);
    if (!idNumber) {
      return this.eventsService.getAllEventsWithBookings();
    }
    const bookings = await this.eventsService.getEventBookingsById(idNumber);
    return {
      bookings,
      bookingsCount: bookings.length,
    };
  }

  @Post('create-dummy-event')
  createDummyEvent() {
    return this.eventsService.createEvent({
      title: 'Dummy Event',
      description: 'This is a dummy event ' + Math.random(),
      date: new Date(),
    });
  }

  @Post('create-event')
  createEvent(
    @Body() data: { title: string; description: string; date: Date },
  ) {
    return this.eventsService.createEvent(data);
  }
}
