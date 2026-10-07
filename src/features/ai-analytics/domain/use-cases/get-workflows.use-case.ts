import { IAiAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { Workflow } from '../entities/workflow.entity';

export class GetWorkflowsUseCase {
  constructor(private repository: IAiAnalyticsRepository) {}

  async execute(): Promise<Workflow[]> {
    return this.repository.getWorkflows();
  }
}
