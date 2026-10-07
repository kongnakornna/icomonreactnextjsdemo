import { IJobCardRepository } from '../repositories/job-card.repository';
import { JobCard, JobCardStatus } from '../entities/job-card.entity';

export class UpdateJobStatusUseCase {
  constructor(private repo: IJobCardRepository) {}

  async execute(id: string, status: JobCardStatus): Promise<JobCard> {
    return this.repo.updateStatus(id, status);
  }
}
