import Image from 'next/image';
import { groups, groupMessages, users } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GroupChat } from '@/components/groups/group-chat';
import { Users as UsersIcon } from 'lucide-react';

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  const group = groups.find((g) => g.id === params.id);
  if (!group) {
    notFound();
  }

  const messages = groupMessages[params.id] || [];
  
  const getSender = (senderId: string) => {
    return users.find(u => u.id === senderId) || { name: 'Unknown', image: { imageUrl: '', imageHint: 'person' } };
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card className="max-w-5xl mx-auto rounded-2xl shadow-lg overflow-hidden">
        <CardHeader className="relative p-0 h-48">
          <Image
            src={group.image.imageUrl}
            alt={group.name}
            fill
            className="object-cover"
            data-ai-hint={group.image.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-headline font-bold">{group.name}</h1>
            <p className="mt-1 opacity-90">{group.description}</p>
            <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
                <UsersIcon className="w-4 h-4" />
                <span>{group.members} members</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <GroupChat initialMessages={messages} groupTopic={group.topic} />
        </CardContent>
      </Card>
    </div>
  );
}
