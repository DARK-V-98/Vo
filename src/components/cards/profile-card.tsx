import Image from 'next/image';
import type { User } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { summarizeUserProfileForMatches } from '@/ai/flows/summarize-user-profile-for-matches';
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';

async function AiSummary({ user }: { user: User }) {
  try {
    // Note: photoDataUri is omitted as we can't easily convert remote URLs to data URIs on the server.
    // The model is expected to work with text-only input.
    const { summary } = await summarizeUserProfileForMatches({
      name: user.name,
      interests: user.interests,
      bio: user.bio,
      photoDataUri: '',
    });
    return <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{summary}</p>;
  } catch (error) {
    console.error('AI summary failed:', error);
    // Fallback to bio if AI fails
    return <p className="text-sm text-muted-foreground mt-2 leading-relaxed truncate">{user.bio}</p>;
  }
}

export function ProfileCard({ user }: { user: User }) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-102 hover:shadow-xl duration-300 ease-in-out group">
      <div className="relative aspect-square">
        <Image
          src={user.image.imageUrl}
          alt={user.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          data-ai-hint={user.image.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-headline font-bold">
            {user.name}, <span className="font-normal">{user.age}</span>
          </h2>
        </div>
      </div>
      <CardContent className="p-4 bg-card">
        <AiSummary user={user} />
        <Button className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
          <Heart className="mr-2 h-4 w-4" /> Connect
        </Button>
      </CardContent>
    </Card>
  );
}
