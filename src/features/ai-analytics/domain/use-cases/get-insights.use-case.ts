import { IAiAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { DataAnalyst } from '../entities/data-analyst.entity';

export class GetInsightsUseCase {
  constructor(private repository: IAiAnalyticsRepository) {}

  async execute(): Promise<DataAnalyst[]> {
    return this.repository.getInsights();
  }
}
