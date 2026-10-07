import { IBatchRepository } from '../repositories/batch.repository';

export class TriggerBatchJobUseCase {
  constructor(private repo: IBatchRepository) {}

  async execute(id: string): Promise<void> {
    return this.repo.trigger(id);
  }
}
