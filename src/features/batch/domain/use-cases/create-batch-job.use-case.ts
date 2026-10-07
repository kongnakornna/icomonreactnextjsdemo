import { IBatchRepository } from '../repositories/batch.repository';
import { BatchJob } from '../entities/batch-job.entity';

export class CreateBatchJobUseCase {
  constructor(private repo: IBatchRepository) {}

  async execute(job: Partial<BatchJob>): Promise<BatchJob> {
    return this.repo.create(job);
  }
}
