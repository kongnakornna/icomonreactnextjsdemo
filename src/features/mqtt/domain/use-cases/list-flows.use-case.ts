import { Flow } from '../entities/flow.entity';
import { IMqttRepository } from '../repositories/mqtt.repository';

export class ListFlowsUseCase {
  constructor(private readonly repository: IMqttRepository) {}

  async execute(): Promise<Flow[]> {
    return this.repository.list();
  }
}
