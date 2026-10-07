import { z } from 'zod';

export const alertSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['active', 'acknowledged', 'resolved', 'dismissed']),
  source: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Alert = z.infer<typeof alertSchema>;
