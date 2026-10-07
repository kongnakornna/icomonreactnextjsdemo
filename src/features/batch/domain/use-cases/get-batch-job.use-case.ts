import { IBatchRepository } from '../repositories/batch.repository';
import { BatchJob } from '../entities/batch-job.entity';

export class GetBatchJobUseCase {
  constructor(private repo: IBatchRepository) {}

  async execute(id: string): Promise<BatchJob | undefined> {
    return this.repo.getById(id);
  }
}
