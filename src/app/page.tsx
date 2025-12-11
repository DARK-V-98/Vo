import { users } from '@/lib/data';
import { ProfileCard } from '@/components/cards/profile-card';

export default function DiscoverPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-headline font-bold mb-8 text-foreground">
        Discover Connections
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {users.map((user) => (
          <ProfileCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
