import { z } from 'zod';

export const workflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.enum(['idle', 'running', 'completed', 'failed']),
  steps: z.array(z.object({
    id: z.string(),
    name: z.string(),
    status: z.enum(['pending', 'running', 'completed', 'failed']),
  })),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Workflow = z.infer<typeof workflowSchema>;
