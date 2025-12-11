import Image from 'next/image';
import type { Event } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Heart } from 'lucide-react';

export function EventCard({ event }: { event: Event }) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-xl group">
      <div className="relative aspect-video">
        <Image
          src={event.image.imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-300"
          data-ai-hint={event.image.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
        <p className="text-muted-foreground pt-2 line-clamp-2">{event.description}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm text-foreground">
          <Calendar className="w-4 h-4 mr-3 text-primary" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-sm text-foreground">
          <MapPin className="w-4 h-4 mr-3 text-primary" />
          <span>{event.location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Heart className="mr-2 h-4 w-4" /> RSVP
        </Button>
      </CardFooter>
    </Card>
  );
}
