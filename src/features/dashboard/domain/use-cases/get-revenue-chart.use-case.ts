import { IDashboardRepository } from '../repositories/dashboard.repository';
import { RevenueData } from '../entities/dashboard.entity';

export class GetRevenueChartUseCase {
  constructor(private repo: IDashboardRepository) {}

  async execute(months?: number): Promise<RevenueData[]> {
    return this.repo.getRevenueChart(months);
  }
}
