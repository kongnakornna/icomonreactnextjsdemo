import { DeployStatus, IMqttRepository } from '../repositories/mqtt.repository';

export class GetDeployStatusUseCase {
  constructor(private readonly repository: IMqttRepository) {}

  async execute(id: string): Promise<DeployStatus> {
    return this.repository.getDeployStatus(id);
  }
}
