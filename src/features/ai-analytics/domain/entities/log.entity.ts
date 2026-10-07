import { z } from 'zod';

export const logSchema = z.object({
  id: z.string(),
  level: z.enum(['info', 'warning', 'error', 'debug']),
  message: z.string(),
  source: z.string(),
  timestamp: z.date(),
  metadata: z.record(z.string()).optional(),
});

export type Log = z.infer<typeof logSchema>;
