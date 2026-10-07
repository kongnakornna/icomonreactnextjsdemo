import { IScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/settings.entity';
import { SettingsApiDataSource } from '../datasources/settings.api.datasource';
import { ScheduleResponseDto } from '../dtos/settings.dto';

export class ScheduleRepositoryImpl implements IScheduleRepository {
  constructor(private ds: SettingsApiDataSource) {}

  async list(params?: { search?: string; page?: number; pageSize?: number; isActive?: boolean }): Promise<{ data: Schedule[]; total: number }> {
    const result = await this.ds.listSchedules(params);
    return {
      data: result.data.map(d => this.toEntity(d)),
      total: result.total,
    };
  }

  async getById(id: string): Promise<Schedule | undefined> {
    try {
      const dto = await this.ds.getScheduleById(id);
      return this.toEntity(dto);
    } catch {
      return undefined;
    }
  }

  async create(schedule: Partial<Schedule>): Promise<Schedule> {
    const dto = await this.ds.createSchedule(schedule as Partial<ScheduleResponseDto>);
    return this.toEntity(dto);
  }

  async update(id: string, schedule: Partial<Schedule>): Promise<Schedule> {
    const dto = await this.ds.updateSchedule(id, schedule as Partial<ScheduleResponseDto>);
    return this.toEntity(dto);
  }

  async delete(id: string): Promise<void> {
    await this.ds.deleteSchedule(id);
  }

  private toEntity(d: ScheduleResponseDto): Schedule {
    return {
      id: d.id,
      name: d.name,
      description: d.description,
      cronExpression: d.cronExpression,
      deviceId: d.deviceId,
      deviceName: d.deviceName,
      action: d.action,
      parameters: d.parameters,
      isActive: d.isActive,
      lastRun: d.lastRun ? new Date(d.lastRun) : undefined,
      nextRun: d.nextRun ? new Date(d.nextRun) : undefined,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }
}
