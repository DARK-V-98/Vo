import { events } from '@/lib/data';
import { EventCard } from '@/components/cards/event-card';

export default function EventsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-headline font-bold text-foreground mb-8">
        Upcoming Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
