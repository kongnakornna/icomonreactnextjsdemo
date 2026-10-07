import { BatchJob, BatchJobHistory } from '../entities/batch-job.entity';

export interface IBatchRepository {
  list(): Promise<BatchJob[]>;
  getById(id: string): Promise<BatchJob | undefined>;
  create(job: Partial<BatchJob>): Promise<BatchJob>;
  trigger(id: string): Promise<void>;
  getHistory(id: string): Promise<BatchJobHistory[]>;
}
