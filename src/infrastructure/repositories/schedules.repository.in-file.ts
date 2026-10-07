import type { ISchedulesRepository } from '@/src/application/repositories/schedules.repository.interface';
import type { Schedule } from '@/src/entities/models/schedule';

export class InFileSchedulesRepository implements ISchedulesRepository {
  private schedules: Schedule[] = [];

  async list(params?: { search?: string; page?: number; pageSize?: number; isActive?: boolean }): Promise<{ data: Schedule[]; total: number }> {
    let filtered = [...this.schedules];

    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(s => s.name.toLowerCase().includes(search));
    }

    if (params?.isActive !== undefined) {
      filtered = filtered.filter(s => s.isActive === params.isActive);
    }

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      data: filtered.slice(start, end),
      total: filtered.length,
    };
  }

  async getById(id: string): Promise<Schedule | undefined> {
    return this.schedules.find(s => s.id === id);
  }

  async create(schedule: Partial<Schedule>): Promise<Schedule> {
    const newSchedule: Schedule = {
      id: Math.random().toString(36).substring(2, 15),
      name: schedule.name || '',
      description: schedule.description,
      cronExpression: schedule.cronExpression || '',
      deviceId: schedule.deviceId,
      deviceName: schedule.deviceName,
      action: schedule.action || '',
      parameters: schedule.parameters,
      isActive: schedule.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.schedules.push(newSchedule);
    return newSchedule;
  }

  async update(id: string, schedule: Partial<Schedule>): Promise<Schedule> {
    const index = this.schedules.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Schedule not found');

    this.schedules[index] = {
      ...this.schedules[index],
      ...schedule,
      updatedAt: new Date(),
    };
    return this.schedules[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.schedules.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Schedule not found');
    this.schedules.splice(index, 1);
  }
}
