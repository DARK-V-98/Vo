'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { generateInterestGroupSuggestions } from '@/ai/flows/generate-interest-group-suggestions';
import { currentUser, groups } from '@/lib/data';
import { Wand2, Loader2, Users } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function AiGroupSuggestions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);
    try {
      const result = await generateInterestGroupSuggestions({
        userProfile: `Name: ${currentUser.name}, Bio: ${currentUser.bio}, Interests: ${currentUser.interests.join(', ')}`,
        existingGroups: groups.map(g => g.name),
      });
      setSuggestions(result.suggestedGroups);
    } catch (e) {
      setError('Failed to generate suggestions. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => { setIsOpen(true); handleGenerate(); }} variant="outline">
        <Wand2 className="mr-2 h-4 w-4" />
        AI Group Suggestions
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">Group Suggestions</DialogTitle>
            <DialogDescription>
              Here are some groups AI thinks you might like based on your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {isLoading && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!isLoading && suggestions.length > 0 && (
              <ul className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="bg-muted p-2 rounded-full">
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="font-semibold">{suggestion}</span>
                  </li>
                ))}
              </ul>
            )}
            {!isLoading && !error && suggestions.length === 0 && (
                <div className="text-center text-muted-foreground p-8">No new suggestions at this time.</div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
            <Button onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Regenerate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
