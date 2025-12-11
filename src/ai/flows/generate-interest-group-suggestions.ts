'use server';

/**
 * @fileOverview Generates interest group suggestions for a user based on their profile and interests.
 *
 * - generateInterestGroupSuggestions - A function that suggests interest groups.
 * - GenerateInterestGroupSuggestionsInput - The input type for the generateInterestGroupSuggestions function.
 * - GenerateInterestGroupSuggestionsOutput - The return type for the generateInterestGroupSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInterestGroupSuggestionsInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The user profile, including interests and preferences.'),
  existingGroups: z
    .array(z.string())
    .describe('A list of names of existing interest groups.'),
});
export type GenerateInterestGroupSuggestionsInput = z.infer<
  typeof GenerateInterestGroupSuggestionsInputSchema
>;

const GenerateInterestGroupSuggestionsOutputSchema = z.object({
  suggestedGroups: z
    .array(z.string())
    .describe('A list of suggested interest groups for the user.'),
});
export type GenerateInterestGroupSuggestionsOutput = z.infer<
  typeof GenerateInterestGroupSuggestionsOutputSchema
>;

export async function generateInterestGroupSuggestions(
  input: GenerateInterestGroupSuggestionsInput
): Promise<GenerateInterestGroupSuggestionsOutput> {
  return generateInterestGroupSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInterestGroupSuggestionsPrompt',
  input: {schema: GenerateInterestGroupSuggestionsInputSchema},
  output: {schema: GenerateInterestGroupSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant interest groups to users based on their profile and interests.

User Profile: {{{userProfile}}}
Existing Groups: {{#each existingGroups}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Based on the user profile, suggest interest groups that the user might be interested in joining. Consider the existing groups and suggest new groups that are not already listed. Focus on specific interests that the user has expressed in their profile.

Output a list of suggested interest groups names. Do not make up user profiles, or reference the existing group names in your answer.
`,
});

const generateInterestGroupSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateInterestGroupSuggestionsFlow',
    inputSchema: GenerateInterestGroupSuggestionsInputSchema,
    outputSchema: GenerateInterestGroupSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
