import { Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post('create-dummy-event')
  createDummyEvent() {
    return this.eventsService.createEvent({
      title: 'Dummy Event',
      description: 'This is a dummy event ' + Math.random(),
      date: new Date(),
    });
  }

  @Get('event-bookings/:id')
  async getEventBookingsById(@Param('id') id: string) {
    const idNumber = parseInt(id, 10);
    if (!idNumber) {
      const allEvents = await this.eventsService.getAllEvents();
      const allEventsWithBookings = allEvents.map(async (event) => {
        const bookings = await this.eventsService.getEventBookingById(event.id);
        return { ...event, bookings };
      });
      return allEventsWithBookings;
    }
    const bookings = await this.eventsService.getEventBookingById(idNumber);
    return {
      bookings,
      bookingsCount: bookings.length,
    };
  }

  @Post('create-event')
  createEvent(data: { title: string; description: string; date: Date }) {
    return this.eventsService.createEvent(data);
  }
}
