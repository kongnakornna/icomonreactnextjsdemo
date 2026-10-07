import { Schedule } from '../entities/settings.entity';

export interface IScheduleRepository {
  list(params?: { search?: string; page?: number; pageSize?: number; isActive?: boolean }): Promise<{ data: Schedule[]; total: number }>;
  getById(id: string): Promise<Schedule | undefined>;
  create(schedule: Partial<Schedule>): Promise<Schedule>;
  update(id: string, schedule: Partial<Schedule>): Promise<Schedule>;
  delete(id: string): Promise<void>;
}
