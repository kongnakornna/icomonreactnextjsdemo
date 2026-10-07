import { IDashboardRepository } from '../repositories/dashboard.repository';
import { DashboardStats } from '../entities/dashboard.entity';

export class GetDashboardStatsUseCase {
  constructor(private repo: IDashboardRepository) {}

  async execute(): Promise<DashboardStats> {
    return this.repo.getStats();
  }
}
