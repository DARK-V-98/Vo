'use client';

import { useState } from 'react';
import Image from 'next/image';
import { conversations, users, currentUser, type Conversation, type User } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function MessagesPage() {
  const [selectedConvo, setSelectedConvo] = useState<Conversation | null>(conversations[0]);

  const getOtherUser = (convo: Conversation): User | undefined => {
    return users.find(u => u.id === convo.userId);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <aside className="w-1/3 border-r h-full">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-headline font-bold">Chats</h2>
        </div>
        <ScrollArea className="h-[calc(100%-4.5rem)]">
          <div className="flex flex-col">
            {conversations.map((convo) => {
              const otherUser = getOtherUser(convo);
              if (!otherUser) return null;
              return (
                <button
                  key={convo.id}
                  onClick={() => setSelectedConvo(convo)}
                  className={cn(
                    "flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors",
                    selectedConvo?.id === convo.id && "bg-muted"
                  )}
                >
                  <Avatar>
                    <AvatarImage src={otherUser.image.imageUrl} alt={otherUser.name} />
                    <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-semibold font-headline truncate">{otherUser.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {convo.messages[convo.messages.length - 1].text}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </aside>

      <main className="w-2/3 flex flex-col h-full bg-muted/30">
        {selectedConvo && getOtherUser(selectedConvo) ? (
          <>
            <div className="p-4 border-b bg-background flex items-center gap-4">
              <Avatar>
                <AvatarImage src={getOtherUser(selectedConvo)!.image.imageUrl} />
                <AvatarFallback>{getOtherUser(selectedConvo)!.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-headline font-semibold">
                {getOtherUser(selectedConvo)!.name}
              </h3>
            </div>
            <ScrollArea className="flex-1 p-6">
                <div className="flex flex-col gap-4">
                {selectedConvo.messages.map((msg) => (
                    <div key={msg.id} className={cn("flex items-end gap-2", msg.senderId === currentUser.id ? 'justify-end' : 'justify-start')}>
                        {msg.senderId !== currentUser.id && (
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={getOtherUser(selectedConvo)?.image.imageUrl} />
                            </Avatar>
                        )}
                         <div className={cn("max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2", msg.senderId === currentUser.id ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-background rounded-bl-none shadow-sm')}>
                            <p>{msg.text}</p>
                         </div>
                    </div>
                ))}
                </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background">
              <div className="relative">
                <Input placeholder="Type a message..." className="pr-12 rounded-full" />
                <Button size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-accent hover:bg-accent/90">
                  <Send className="h-5 w-5 text-accent-foreground" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </main>
    </div>
  );
}
