import { ISystemRepository } from '../repositories/system.repository';

export class PingUseCase {
  constructor(private repository: ISystemRepository) {}

  async execute(): Promise<{ latency: number }> {
    return this.repository.ping();
  }
}
