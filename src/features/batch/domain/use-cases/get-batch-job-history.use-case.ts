import { IBatchRepository } from '../repositories/batch.repository';
import { BatchJobHistory } from '../entities/batch-job.entity';

export class GetBatchJobHistoryUseCase {
  constructor(private repo: IBatchRepository) {}

  async execute(id: string): Promise<BatchJobHistory[]> {
    return this.repo.getHistory(id);
  }
}
