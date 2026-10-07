import { z } from 'zod';

export const reportSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(['summary', 'detailed', 'custom']),
  status: z.enum(['draft', 'generating', 'completed', 'failed']),
  createdAt: z.date(),
  completedAt: z.date().optional(),
});

export type Report = z.infer<typeof reportSchema>;
