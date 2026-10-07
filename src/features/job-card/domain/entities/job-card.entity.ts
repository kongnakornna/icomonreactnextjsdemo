import { z } from 'zod';

export const JobCardStatusSchema = z.enum(['todo', 'in_progress', 'review', 'done']);
export const JobCardPrioritySchema = z.enum(['low', 'medium', 'high', 'urgent']);

export type JobCardStatus = z.infer<typeof JobCardStatusSchema>;
export type JobCardPriority = z.infer<typeof JobCardPrioritySchema>;

export const JobCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: JobCardStatusSchema,
  assigneeId: z.string().nullable(),
  priority: JobCardPrioritySchema,
  dueDate: z.coerce.date().nullable(),
});

export type JobCard = z.infer<typeof JobCardSchema>;
