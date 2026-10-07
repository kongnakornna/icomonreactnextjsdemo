import { ISystemRepository } from '../repositories/system.repository';
import { ApiMetrics } from '../entities/system.entity';

export class GetApiMetricUseCase {
  constructor(private repository: ISystemRepository) {}

  async execute(): Promise<ApiMetrics> {
    return this.repository.getApiMetric();
  }
}
