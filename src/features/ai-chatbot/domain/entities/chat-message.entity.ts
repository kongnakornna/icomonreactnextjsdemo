import { z } from 'zod';

export const chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  model: z.string().optional(),
  timestamp: z.date(),
  toolCalls: z.array(z.object({
    id: z.string(),
    name: z.string(),
    arguments: z.string(),
  })).optional(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
