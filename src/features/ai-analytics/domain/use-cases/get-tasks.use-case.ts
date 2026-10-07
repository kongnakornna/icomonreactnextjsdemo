import { IAiAnalyticsRepository } from '../repositories/ai-analytics.repository';

export class GetTasksUseCase {
  constructor(private repository: IAiAnalyticsRepository) {}

  async execute(): Promise<{ id: string; name: string; status: string }[]> {
    return this.repository.getTasks();
  }
}
