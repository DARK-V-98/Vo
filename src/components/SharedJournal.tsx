'use client';

import { useState } from 'react';
import { useAuth, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, serverTimestamp, orderBy, query, doc } from 'firebase/firestore';
import { addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BookHeart, Send, Trash2, X } from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  
  const handleDelete = (entryId: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, 'sharedJournal', 'vishu-oshi', 'entries', entryId);
    deleteDocumentNonBlocking(docRef);
  };


  const getUserName = (userId: string) => {
    // In a real app, you'd fetch user profiles.
    // For now, we'll assume 'Vishu' and 'Oshi'.
    // This is a simplified stand-in.
    if (!user) return 'Anonymous';
    return userId === user.uid ? 'You' : 'Your Love';
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
          <h3 className="text-xl font-display font-semibold text-foreground mb-4 text-center">Write a new entry...</h3>
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="What's on your mind today, my love?"
            className="bg-rose-soft border-none h-28 focus:ring-2 focus:ring-primary/50"
          />
          <div className="flex justify-end mt-4">
            <Button type="button" onClick={handleSubmit} disabled={!entry.trim() || isLoading}>
              <Send className="mr-2 h-4 w-4" />
              Save Entry
            </Button>
          </div>
        </div>

        <div className="text-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="lg" className="bg-rose-soft/50 hover:bg-rose-soft">
                        <BookHeart className="mr-2 h-5 w-5" />
                        Open Our Journal
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0">
                    <DialogHeader className="p-6 pb-4">
                        <DialogTitle className="text-2xl font-display flex items-center gap-2">
                            <BookHeart className="w-6 h-6 text-primary" />
                            Our Shared Journal
                        </DialogTitle>
                        <DialogDescription>
                            Our collection of moments and thoughts.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="flex-1 px-6 pb-6">
                        <div className="space-y-6">
                            {isLoading && <p className="text-center text-muted-foreground py-10">Loading entries...</p>}
                            {entries && entries.length === 0 && !isLoading && (
                                <p className="text-center text-muted-foreground py-10">The first page is waiting for your story...</p>
                            )}
                            {entries && entries.map((entry) => (
                                <div key={entry.id} className="card-romantic rounded-2xl p-6 animate-fade-in group relative">
                                    <p className="text-foreground/90 whitespace-pre-wrap">{entry.content}</p>
                                    <div className="text-right text-xs text-muted-foreground mt-4 border-t border-border/50 pt-2">
                                        <p className="font-semibold">{getUserName(entry.userId)}</p>
                                        <p>
                                        {entry.timestamp
                                            ? format(new Date(entry.timestamp.seconds * 1000), "MMMM d, yyyy 'at' h:mm a")
                                            : 'Just now'}
                                        </p>
                                    </div>
                                    {user && entry.userId === user.uid && (
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => handleDelete(entry.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete entry</span>
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
      </div>
    </section>
  );
};

export default SharedJournal;
