import { IAiAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { Schedule } from '../entities/schedule.entity';

export class GetSchedulesUseCase {
  constructor(private repository: IAiAnalyticsRepository) {}

  async execute(): Promise<Schedule[]> {
    return this.repository.getSchedules();
  }
}
