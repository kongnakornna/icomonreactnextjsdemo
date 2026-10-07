import { Alarm } from '../entities/alarm.entity';

export interface IAlarmRepository {
  list(params?: { search?: string; page?: number; pageSize?: number; severity?: string; status?: string }): Promise<{ data: Alarm[]; total: number }>;
  getById(id: string): Promise<Alarm | undefined>;
  acknowledge(id: string): Promise<Alarm>;
}
