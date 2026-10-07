import { IAiAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { Report } from '../entities/report.entity';

export class GetReportsUseCase {
  constructor(private repository: IAiAnalyticsRepository) {}

  async execute(): Promise<Report[]> {
    return this.repository.getReports();
  }
}
