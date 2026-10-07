import { IAiAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { Log } from '../entities/log.entity';

export class GetLogsUseCase {
  constructor(private repository: IAiAnalyticsRepository) {}

  async execute(): Promise<Log[]> {
    return this.repository.getLogs();
  }
}
