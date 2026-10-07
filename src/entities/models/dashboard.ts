import { z } from 'zod';

export const dashboardStatsSchema = z.object({
  totalOrders: z.number(),
  pendingOrders: z.number(),
  completedOrders: z.number(),
  totalCustomers: z.number(),
  totalRevenue: z.number(),
  monthlyRevenue: z.number(),
});

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;

export const revenueDataSchema = z.object({
  month: z.string(),
  revenue: z.number(),
  orders: z.number(),
});

export type RevenueData = z.infer<typeof revenueDataSchema>;

export const jobStatusSummarySchema = z.object({
  pending: z.number(),
  inProgress: z.number(),
  completed: z.number(),
  failed: z.number(),
});

export type JobStatusSummary = z.infer<typeof jobStatusSummarySchema>;
