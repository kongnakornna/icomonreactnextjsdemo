import type { DashboardStats, RevenueData, JobStatusSummary } from '@/src/entities/models/dashboard';

export interface IDashboardRepository {
  getStats(): Promise<DashboardStats>;
  getRevenueChart(months?: number): Promise<RevenueData[]>;
  getJobStatus(): Promise<JobStatusSummary>;
}
