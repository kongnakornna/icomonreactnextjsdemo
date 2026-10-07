import { IJobCardRepository } from '../repositories/job-card.repository';
import { JobCard } from '../entities/job-card.entity';

export class UpdateJobUseCase {
  constructor(private repo: IJobCardRepository) {}

  async execute(id: string, job: Partial<JobCard>): Promise<JobCard> {
    return this.repo.update(id, job);
  }
}
