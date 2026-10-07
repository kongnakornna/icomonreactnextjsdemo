import { IScheduleRepository } from '../repositories/schedule.repository';
import { Schedule } from '../entities/settings.entity';

export class ListSchedulesUseCase {
  constructor(private repo: IScheduleRepository) {}

  async execute(params?: { search?: string; page?: number; pageSize?: number; isActive?: boolean }): Promise<{ data: Schedule[]; total: number }> {
    return this.repo.list(params);
  }
}

export class CreateScheduleUseCase {
  constructor(private repo: IScheduleRepository) {}

  async execute(schedule: Partial<Schedule>): Promise<Schedule> {
    return this.repo.create(schedule);
  }
}

export class GetScheduleUseCase {
  constructor(private repo: IScheduleRepository) {}

  async execute(id: string): Promise<Schedule | undefined> {
    return this.repo.getById(id);
  }
}

export class UpdateScheduleUseCase {
  constructor(private repo: IScheduleRepository) {}

  async execute(id: string, schedule: Partial<Schedule>): Promise<Schedule> {
    return this.repo.update(id, schedule);
  }
}

export class DeleteScheduleUseCase {
  constructor(private repo: IScheduleRepository) {}

  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
