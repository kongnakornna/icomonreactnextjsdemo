import { z } from 'zod';

export const scheduleSchema = z.object({
  id: z.string(),
  name: z.string(),
  cronExpression: z.string(),
  taskType: z.string(),
  status: z.enum(['active', 'paused', 'completed']),
  lastRun: z.date().optional(),
  nextRun: z.date().optional(),
});

export type Schedule = z.infer<typeof scheduleSchema>;
