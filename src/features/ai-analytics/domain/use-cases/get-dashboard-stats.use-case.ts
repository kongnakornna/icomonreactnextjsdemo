import { IAiAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { DashboardStats } from '../entities/dashboard.entity';

export class GetDashboardStatsUseCase {
  constructor(private repository: IAiAnalyticsRepository) {}

  async execute(): Promise<DashboardStats> {
    return this.repository.getDashboardStats();
  }
}
