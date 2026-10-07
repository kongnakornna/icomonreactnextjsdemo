import { AvailableSensor, IMqttRepository } from '../repositories/mqtt.repository';

export class GetAvailableSensorsUseCase {
  constructor(private readonly repository: IMqttRepository) {}

  async execute(): Promise<AvailableSensor[]> {
    return this.repository.getAvailableSensors();
  }
}
