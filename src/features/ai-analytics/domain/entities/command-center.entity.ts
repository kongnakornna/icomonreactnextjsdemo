import { z } from 'zod';

export const commandCenterSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['operational', 'degraded', 'offline']),
  activeAlerts: z.number(),
  pendingTasks: z.number(),
  lastUpdated: z.date(),
});

export type CommandCenter = z.infer<typeof commandCenterSchema>;
