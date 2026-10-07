import { IAlarmRepository } from '../repositories/alarm.repository';
import { Alarm } from '../entities/alarm.entity';

export class GetAlarmUseCase {
  constructor(private repo: IAlarmRepository) {}

  async execute(id: string): Promise<Alarm | undefined> {
    return this.repo.getById(id);
  }
}
