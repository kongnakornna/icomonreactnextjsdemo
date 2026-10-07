import { ISystemRepository } from '../repositories/system.repository';

export class GetMetricsUseCase {
  constructor(private repository: ISystemRepository) {}

  async execute(): Promise<{ cpu: number; memory: number; uptime: number }> {
    return this.repository.getMetrics();
  }
}
