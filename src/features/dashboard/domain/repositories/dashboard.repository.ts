import { DashboardStats, RevenueData, JobStatusSummary } from '../entities/dashboard.entity';

export interface IDashboardRepository {
  getStats(): Promise<DashboardStats>;
  getRevenueChart(months?: number): Promise<RevenueData[]>;
  getJobStatus(): Promise<JobStatusSummary>;
}
