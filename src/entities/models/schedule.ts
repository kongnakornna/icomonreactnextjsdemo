import { z } from 'zod';

export const scheduleSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  cronExpression: z.string(),
  deviceId: z.string().optional(),
  deviceName: z.string().optional(),
  action: z.string(),
  parameters: z.record(z.unknown()).optional(),
  isActive: z.boolean().default(true),
  lastRun: z.date().optional(),
  nextRun: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Schedule = z.infer<typeof scheduleSchema>;

export const createScheduleSchema = scheduleSchema
  .omit({ id: true, createdAt: true, updatedAt: true, lastRun: true, nextRun: true });

export type CreateSchedule = z.infer<typeof createScheduleSchema>;
