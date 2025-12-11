'use client';

import { useState } from 'react';
import { useAuth, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BookHeart, Send } from 'lucide-react';
import { format } from 'date-fns';

interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  } | null;
  coupleId: 'vishu-oshi';
}

const SharedJournal = () => {
  const [entry, setEntry] = useState('');
  const { user } = useAuth();
  const firestore = useFirestore();

  const entriesRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'sharedJournal', 'vishu-oshi', 'entries'), orderBy('timestamp', 'desc'));
  }, [firestore]);

  const { data: entries, isLoading } = useCollection<JournalEntry>(entriesRef);

  const handleSubmit = () => {
    if (entry.trim() && user && firestore) {
      const journalCollection = collection(firestore, 'sharedJournal', 'vishu-oshi', 'entries');
      addDocumentNonBlocking(journalCollection, {
        userId: user.uid,
        content: entry,
        timestamp: serverTimestamp(),
        coupleId: 'vishu-oshi',
      });
      setEntry('');
    }
  };

  const getUserName = (userId: string) => {
    // In a real app, you'd fetch user profiles.
    // For now, we'll use a simple logic.
    return userId === user?.uid ? 'You' : 'Them';
  };

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookHeart className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground">
              Our <span className="text-gradient italic">Shared Journal</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            A private space for our thoughts, dreams, and feelings.
          </p>
        </div>

        <div className="card-romantic rounded-3xl p-6 md:p-8 mb-8">
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="What's on your mind today, my love?"
            className="bg-rose-soft border-none h-28 focus:ring-2 focus:ring-primary/50"
          />
          <div className="flex justify-end mt-4">
            <Button type="button" onClick={handleSubmit} disabled={!entry.trim()}>
              <Send className="mr-2" />
              Save Entry
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {isLoading && <p className="text-center text-muted-foreground">Loading entries...</p>}
          {entries && entries.map((entry) => (
            <div key={entry.id} className="card-romantic rounded-2xl p-6 animate-fade-in">
              <p className="text-foreground/90 whitespace-pre-wrap">{entry.content}</p>
              <div className="text-right text-xs text-muted-foreground mt-4 border-t border-border/50 pt-2">
                <p>{getUserName(entry.userId)}</p>
                <p>
                  {entry.timestamp
                    ? format(new Date(entry.timestamp.seconds * 1000), "MMMM d, yyyy 'at' h:mm a")
                    : 'Just now'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SharedJournal;
