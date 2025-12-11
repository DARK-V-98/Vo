import { config } from 'dotenv';
config();

import '@/ai/flows/generate-interest-group-suggestions.ts';
import '@/ai/flows/summarize-user-profile-for-matches.ts';
import '@/ai/flows/monitor-group-discussions.ts';