import { IJobCardRepository } from '../repositories/job-card.repository';
import { JobCard } from '../entities/job-card.entity';

export class GetJobUseCase {
  constructor(private repo: IJobCardRepository) {}

  async execute(id: string): Promise<JobCard | undefined> {
    return this.repo.getById(id);
  }
}
