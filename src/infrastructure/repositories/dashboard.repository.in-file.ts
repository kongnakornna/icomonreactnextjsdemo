import type { IDashboardRepository } from '@/src/application/repositories/dashboard.repository.interface';
import type { DashboardStats, RevenueData, JobStatusSummary } from '@/src/entities/models/dashboard';

export class InFileDashboardRepository implements IDashboardRepository {
  async getStats(): Promise<DashboardStats> {
    return {
      totalOrders: 150,
      pendingOrders: 12,
      completedOrders: 120,
      totalCustomers: 45,
      totalRevenue: 125000,
      monthlyRevenue: 15000,
    };
  }

  async getRevenueChart(months: number = 6): Promise<RevenueData[]> {
    const data: RevenueData[] = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      data.push({
        month: date.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
        revenue: Math.floor(Math.random() * 20000) + 10000,
        orders: Math.floor(Math.random() * 30) + 10,
      });
    }

    return data;
  }

  async getJobStatus(): Promise<JobStatusSummary> {
    return {
      pending: 5,
      inProgress: 8,
      completed: 45,
      failed: 2,
    };
  }
}
