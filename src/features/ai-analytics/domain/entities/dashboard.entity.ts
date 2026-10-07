import { z } from 'zod';

export const dashboardStatsSchema = z.object({
  totalAlerts: z.number(),
  activeAlerts: z.number(),
  totalReports: z.number(),
  pendingTasks: z.number(),
  systemHealth: z.number(),
  aiInsights: z.number(),
});

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;
