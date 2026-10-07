import { IJobCardRepository } from '../repositories/job-card.repository';
import { JobCard } from '../entities/job-card.entity';

export class ListJobsUseCase {
  constructor(private repo: IJobCardRepository) {}

  async execute(params?: { search?: string; page?: number; pageSize?: number; status?: string; priority?: string }): Promise<{ data: JobCard[]; total: number }> {
    return this.repo.list(params);
  }
}
