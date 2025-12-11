import Image from 'next/image';
import Link from 'next/link';
import type { Group } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';

export function GroupCard({ group }: { group: Group }) {
  return (
    <Card className="flex flex-col rounded-2xl overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={group.image.imageUrl}
          alt={group.name}
          fill
          className="object-cover"
          data-ai-hint={group.image.imageHint}
        />
      </div>
      <div className="flex flex-col flex-1">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{group.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-muted-foreground line-clamp-2">{group.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <div className="flex items-center text-muted-foreground text-sm">
                <Users className="w-4 h-4 mr-2" />
                <span>{group.members} members</span>
            </div>
            <Button asChild variant="ghost" className="text-primary hover:text-primary">
                <Link href={`/groups/${group.id}`}>
                    View Group <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
