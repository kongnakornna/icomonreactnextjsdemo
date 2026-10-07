import { IAlarmRepository } from '../../domain/repositories/alarm.repository';
import { Alarm } from '../../domain/entities/alarm.entity';
import { AlarmApiDataSource } from '../datasources/alarm.api.datasource';
import { AlarmResponseDto } from '../dtos/alarm.dto';

export class AlarmRepositoryImpl implements IAlarmRepository {
  constructor(private ds: AlarmApiDataSource) {}

  async list(params?: { search?: string; page?: number; pageSize?: number; severity?: string; status?: string }): Promise<{ data: Alarm[]; total: number }> {
    const result = await this.ds.list(params);
    return {
      data: result.data.map(d => this.toEntity(d)),
      total: result.total,
    };
  }

  async getById(id: string): Promise<Alarm | undefined> {
    try {
      const dto = await this.ds.getById(id);
      return this.toEntity(dto);
    } catch {
      return undefined;
    }
  }

  async acknowledge(id: string): Promise<Alarm> {
    const dto = await this.ds.acknowledge(id);
    return this.toEntity(dto);
  }

  private toEntity(d: AlarmResponseDto): Alarm {
    return {
      id: d.id,
      name: d.name,
      severity: d.severity as Alarm['severity'],
      status: d.status as Alarm['status'],
      deviceId: d.deviceId,
      message: d.message,
      createdAt: new Date(d.createdAt),
    };
  }
}
