import { Flow } from '../entities/flow.entity';
import { IMqttRepository } from '../repositories/mqtt.repository';

export class SaveFlowUseCase {
  constructor(private readonly repository: IMqttRepository) {}

  async execute(flow: Flow): Promise<Flow> {
    return this.repository.save(flow);
  }
}
