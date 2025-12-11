'use server';

/**
 * @fileOverview Summarizes user profiles for potential matches.
 *
 * This file defines a Genkit flow that takes a user profile as input and
 * returns a concise and engaging summary of the profile, designed to help
 * potential matches quickly understand the user's key attributes.
 *
 * @interface SummarizeUserProfileForMatchesInput - The input type for the summarizeUserProfileForMatches function.
 * @interface SummarizeUserProfileForMatchesOutput - The output type for the summarizeUserProfileForMatches function.
 * @function summarizeUserProfileForMatches - A function that handles the summarization of user profiles for matches.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUserProfileForMatchesInputSchema = z.object({
  name: z.string().describe('The user\'s name.'),
  interests: z
    .array(z.string())
    .describe('A list of the user\'s interests and hobbies.'),
  bio: z.string().describe('A brief biography or description of the user.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizeUserProfileForMatchesInput = z.infer<typeof SummarizeUserProfileForMatchesInputSchema>;

const SummarizeUserProfileForMatchesOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise and engaging summary of the user profile, highlighting key attributes and interests.'
    ),
});
export type SummarizeUserProfileForMatchesOutput = z.infer<typeof SummarizeUserProfileForMatchesOutputSchema>;

export async function summarizeUserProfileForMatches(
  input: SummarizeUserProfileForMatchesInput
): Promise<SummarizeUserProfileForMatchesOutput> {
  return summarizeUserProfileForMatchesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUserProfileForMatchesPrompt',
  input: {schema: SummarizeUserProfileForMatchesInputSchema},
  output: {schema: SummarizeUserProfileForMatchesOutputSchema},
  prompt: `You are a dating profile writer. Create a short, engaging, and attractive dating profile summary (2-3 sentences max) based on the information provided. Be creative, but keep it concise.

Here are the user details:
Name: {{{name}}}
Interests: {{#each interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Bio: {{{bio}}}
Photo: {{media url=photoDataUri}}
`,
});

const summarizeUserProfileForMatchesFlow = ai.defineFlow(
  {
    name: 'summarizeUserProfileForMatchesFlow',
    inputSchema: SummarizeUserProfileForMatchesInputSchema,
    outputSchema: SummarizeUserProfileForMatchesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
