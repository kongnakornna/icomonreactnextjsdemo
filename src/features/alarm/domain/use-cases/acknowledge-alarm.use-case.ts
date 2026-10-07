import { IAlarmRepository } from '../repositories/alarm.repository';
import { Alarm } from '../entities/alarm.entity';

export class AcknowledgeAlarmUseCase {
  constructor(private repo: IAlarmRepository) {}

  async execute(id: string): Promise<Alarm> {
    return this.repo.acknowledge(id);
  }
}
