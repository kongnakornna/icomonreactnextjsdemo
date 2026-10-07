import { IDashboardRepository } from '../repositories/dashboard.repository';
import { JobStatusSummary } from '../entities/dashboard.entity';

export class GetJobStatusUseCase {
  constructor(private repo: IDashboardRepository) {}

  async execute(): Promise<JobStatusSummary> {
    return this.repo.getJobStatus();
  }
}
