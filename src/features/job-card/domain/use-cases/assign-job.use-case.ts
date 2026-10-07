import { IJobCardRepository } from '../repositories/job-card.repository';
import { JobCard } from '../entities/job-card.entity';

export class AssignJobUseCase {
  constructor(private repo: IJobCardRepository) {}

  async execute(id: string, assigneeId: string): Promise<JobCard> {
    return this.repo.assign(id, assigneeId);
  }
}
