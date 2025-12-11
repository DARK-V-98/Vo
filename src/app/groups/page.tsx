import { groups } from '@/lib/data';
import { GroupCard } from '@/components/cards/group-card';
import { AiGroupSuggestions } from '@/components/ai/ai-group-suggestions';

export default function GroupsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl lg:text-4xl font-headline font-bold text-foreground">
          Interest Groups
        </h1>
        <AiGroupSuggestions />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
