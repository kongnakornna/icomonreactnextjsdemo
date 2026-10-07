import { IAiAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { Alert } from '../entities/alert.entity';

export class GetAlertsUseCase {
  constructor(private repository: IAiAnalyticsRepository) {}

  async execute(): Promise<Alert[]> {
    return this.repository.getAlerts();
  }
}
