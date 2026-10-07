import { IDashboardRepository } from '../../domain/repositories/dashboard.repository';
import { DashboardStats, RevenueData, JobStatusSummary } from '../../domain/entities/dashboard.entity';
import { DashboardApiDataSource } from '../datasources/dashboard.api.datasource';
import { DashboardStatsResponseDto, RevenueDataResponseDto, JobStatusSummaryResponseDto } from '../dtos/dashboard.dto';

export class DashboardRepositoryImpl implements IDashboardRepository {
  constructor(private ds: DashboardApiDataSource) {}

  async getStats(): Promise<DashboardStats> {
    const dto = await this.ds.getStats();
    return this.toStatsEntity(dto);
  }

  async getRevenueChart(months?: number): Promise<RevenueData[]> {
    const dtos = await this.ds.getRevenueChart(months);
    return dtos.map(d => this.toRevenueEntity(d));
  }

  async getJobStatus(): Promise<JobStatusSummary> {
    const dto = await this.ds.getJobStatus();
    return this.toJobStatusEntity(dto);
  }

  private toStatsEntity(d: DashboardStatsResponseDto): DashboardStats {
    return {
      totalOrders: d.totalOrders,
      pendingOrders: d.pendingOrders,
      completedOrders: d.completedOrders,
      totalCustomers: d.totalCustomers,
      totalRevenue: d.totalRevenue,
      monthlyRevenue: d.monthlyRevenue,
    };
  }

  private toRevenueEntity(d: RevenueDataResponseDto): RevenueData {
    return {
      month: d.month,
      revenue: d.revenue,
      orders: d.orders,
    };
  }

  private toJobStatusEntity(d: JobStatusSummaryResponseDto): JobStatusSummary {
    return {
      pending: d.pending,
      inProgress: d.inProgress,
      completed: d.completed,
      failed: d.failed,
    };
  }
}
