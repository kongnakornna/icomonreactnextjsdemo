import { DeployStatus, IMqttRepository } from '../repositories/mqtt.repository';

export class DeployFlowUseCase {
  constructor(private readonly repository: IMqttRepository) {}

  async execute(id: string): Promise<DeployStatus> {
    return this.repository.deploy(id);
  }
}
