import { IAlarmRepository } from '../repositories/alarm.repository';
import { Alarm } from '../entities/alarm.entity';

export class ListAlarmsUseCase {
  constructor(private repo: IAlarmRepository) {}

  async execute(params?: { search?: string; page?: number; pageSize?: number; severity?: string; status?: string }): Promise<{ data: Alarm[]; total: number }> {
    return this.repo.list(params);
  }
}
