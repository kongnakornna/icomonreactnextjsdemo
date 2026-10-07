import { BrokerConfig, IMqttRepository } from '../repositories/mqtt.repository';

export class GetBrokerConfigUseCase {
  constructor(private readonly repository: IMqttRepository) {}

  async execute(): Promise<BrokerConfig> {
    return this.repository.getBrokerConfig();
  }
}
