import Image from 'next/image';
import { currentUser } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden rounded-2xl shadow-lg">
          <CardHeader className="relative p-0 h-48 sm:h-64">
            <Image
              src="https://picsum.photos/seed/profile-bg/1200/400"
              alt="Profile banner"
              fill
              className="object-cover"
              data-ai-hint="abstract background"
            />
            <div className="absolute bottom-0 left-6 translate-y-1/2">
              <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-card shadow-lg">
                <Image
                  src={currentUser.image.imageUrl}
                  alt={currentUser.name}
                  fill
                  className="rounded-full object-cover"
                  data-ai-hint={currentUser.image.imageHint}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-24 sm:pt-28 px-6 pb-6">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-headline font-bold">
                  {currentUser.name}, {currentUser.age}
                </CardTitle>
                <p className="text-muted-foreground mt-1">Lover of life, art, and everything in between.</p>
              </div>
              <Button variant="outline">
                <Pencil className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-headline font-semibold mb-3">About Me</h3>
              <p className="text-foreground/80 leading-relaxed">{currentUser.bio}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-headline font-semibold mb-4">Interests</h3>
              <div className="flex flex-wrap gap-3">
                {currentUser.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="text-sm py-1 px-3 rounded-lg">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
