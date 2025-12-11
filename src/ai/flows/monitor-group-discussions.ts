'use server';

/**
 * @fileOverview Monitors group discussions and flags inappropriate content.
 *
 * - monitorGroupDiscussion - A function that monitors the discussion and flags inappropriate content.
 * - MonitorGroupDiscussionInput - The input type for the monitorGroupDiscussion function.
 * - MonitorGroupDiscussionOutput - The return type for the monitorGroupDiscussion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MonitorGroupDiscussionInputSchema = z.object({
  message: z.string().describe('The message to be checked for inappropriate content.'),
  groupTopic: z.string().describe('The topic of the discussion group.'),
});
export type MonitorGroupDiscussionInput = z.infer<typeof MonitorGroupDiscussionInputSchema>;

const MonitorGroupDiscussionOutputSchema = z.object({
  isAppropriate: z.boolean().describe('Whether the message is appropriate for the group.'),
  flagReason: z.string().optional().describe('The reason the message was flagged as inappropriate.'),
});
export type MonitorGroupDiscussionOutput = z.infer<typeof MonitorGroupDiscussionOutputSchema>;

export async function monitorGroupDiscussion(input: MonitorGroupDiscussionInput): Promise<MonitorGroupDiscussionOutput> {
  return monitorGroupDiscussionFlow(input);
}

const monitorGroupDiscussionPrompt = ai.definePrompt({
  name: 'monitorGroupDiscussionPrompt',
  input: {schema: MonitorGroupDiscussionInputSchema},
  output: {schema: MonitorGroupDiscussionOutputSchema},
  prompt: `You are an AI assistant tasked with monitoring online group discussions for inappropriate content.
  Your goal is to ensure a safe and respectful environment for all users.

  Analyze the following message from a discussion group about "{{groupTopic}}" and determine if it is appropriate.

  Message: "{{message}}"

  Consider the following factors when making your determination:
  - Is the message respectful and considerate of others?
  - Does the message contain any hate speech, harassment, or discrimination?
  - Is the message sexually explicit or exploitative?
  - Does the message promote violence or illegal activities?

  Return a JSON object with the following fields:
  - isAppropriate: true if the message is appropriate, false if it is not.
  - flagReason: If the message is not appropriate, provide a brief explanation of why it was flagged.
  If the message is appropriate, this field may be omitted.
  `,
});

const monitorGroupDiscussionFlow = ai.defineFlow(
  {
    name: 'monitorGroupDiscussionFlow',
    inputSchema: MonitorGroupDiscussionInputSchema,
    outputSchema: MonitorGroupDiscussionOutputSchema,
  },
  async input => {
    const {output} = await monitorGroupDiscussionPrompt(input);
    return output!;
  }
);
