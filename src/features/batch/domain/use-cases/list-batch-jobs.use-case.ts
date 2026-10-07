import { IBatchRepository } from '../repositories/batch.repository';
import { BatchJob } from '../entities/batch-job.entity';

export class ListBatchJobsUseCase {
  constructor(private repo: IBatchRepository) {}

  async execute(): Promise<BatchJob[]> {
    return this.repo.list();
  }
}
