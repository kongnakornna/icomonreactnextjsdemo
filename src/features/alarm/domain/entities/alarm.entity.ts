import { z } from 'zod';

export const AlarmSeveritySchema = z.enum(['low', 'medium', 'high', 'critical']);
export const AlarmStatusSchema = z.enum(['active', 'acknowledged', 'resolved']);

export type AlarmSeverity = z.infer<typeof AlarmSeveritySchema>;
export type AlarmStatus = z.infer<typeof AlarmStatusSchema>;

export const AlarmSchema = z.object({
  id: z.string(),
  name: z.string(),
  severity: AlarmSeveritySchema,
  status: AlarmStatusSchema,
  deviceId: z.string(),
  message: z.string(),
  createdAt: z.coerce.date(),
});

export type Alarm = z.infer<typeof AlarmSchema>;
