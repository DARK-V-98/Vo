'use client';

import { useState, useRef, useEffect } from 'react';
import type { Message } from '@/lib/data';
import { users, currentUser } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type GroupChatProps = {
    initialMessages: Message[];
    groupTopic: string;
}

export function GroupChat({ initialMessages, groupTopic }: GroupChatProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight });
        }
    }, [messages]);

    const getSender = (senderId: string) => {
        if (senderId === currentUser.id) return currentUser;
        return users.find(u => u.id === senderId) || { name: 'Unknown', image: { imageUrl: '' } };
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || isSending) return;

        setIsSending(true);

        try {
            const message: Message = {
                id: `msg-${Date.now()}`,
                senderId: currentUser.id,
                text: newMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, message]);
            setNewMessage('');

        } catch (error) {
            console.error('Failed to send message:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not send message. Please try again.',
            });
        } finally {
            setIsSending(false);
        }
    };
    
    return (
        <div className="flex flex-col h-[65vh]">
            <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                <div className="flex flex-col gap-6">
                    {messages.map((msg) => {
                        const sender = getSender(msg.senderId);
                        return (
                            <div key={msg.id} className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={sender?.image.imageUrl} alt={sender?.name} />
                                    <AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-baseline gap-2">
                                        <p className="font-headline font-semibold">{sender?.name}</p>
                                        <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                                    </div>
                                    <p className="text-foreground/90">{msg.text}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background">
                <form onSubmit={handleSendMessage} className="relative">
                    <Input 
                        placeholder="Join the discussion..." 
                        className="pr-12 rounded-full" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={isSending}
                    />
                    <Button 
                        type="submit"
                        size="icon" 
                        className="absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-accent hover:bg-accent/90"
                        disabled={isSending || !newMessage.trim()}
                    >
                        {isSending ? <Loader2 className="h-5 w-5 animate-spin"/> : <Send className="h-5 w-5 text-accent-foreground" />}
                    </Button>
                </form>
            </div>
        </div>
    );
}
