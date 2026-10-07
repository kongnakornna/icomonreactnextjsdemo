import { IJobCardRepository } from '../repositories/job-card.repository';
import { JobCard } from '../entities/job-card.entity';

export class CreateJobUseCase {
  constructor(private repo: IJobCardRepository) {}

  async execute(job: Partial<JobCard>): Promise<JobCard> {
    return this.repo.create(job);
  }
}
