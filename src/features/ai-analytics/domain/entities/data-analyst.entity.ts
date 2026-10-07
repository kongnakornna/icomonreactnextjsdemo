import { z } from 'zod';

export const dataAnalystSchema = z.object({
  id: z.string(),
  query: z.string(),
  result: z.string(),
  visualization: z.enum(['table', 'chart', 'graph']),
  createdAt: z.date(),
});

export type DataAnalyst = z.infer<typeof dataAnalystSchema>;
