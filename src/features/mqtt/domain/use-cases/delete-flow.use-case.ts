import { IMqttRepository } from '../repositories/mqtt.repository';

export class DeleteFlowUseCase {
  constructor(private readonly repository: IMqttRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
