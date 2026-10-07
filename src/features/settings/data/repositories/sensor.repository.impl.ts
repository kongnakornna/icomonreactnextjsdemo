import { ISensorRepository } from '../../domain/repositories/sensor.repository';
import { Sensor } from '../../domain/entities/settings.entity';
import { SettingsApiDataSource } from '../datasources/settings.api.datasource';
import { SensorResponseDto } from '../dtos/settings.dto';

export class SensorRepositoryImpl implements ISensorRepository {
  constructor(private ds: SettingsApiDataSource) {}

  async list(params?: { search?: string; page?: number; pageSize?: number; type?: string }): Promise<{ data: Sensor[]; total: number }> {
    const result = await this.ds.listSensors(params);
    return {
      data: result.data.map(d => this.toEntity(d)),
      total: result.total,
    };
  }

  async getById(id: string): Promise<Sensor | undefined> {
    try {
      const dto = await this.ds.getSensorById(id);
      return this.toEntity(dto);
    } catch {
      return undefined;
    }
  }

  async create(sensor: Partial<Sensor>): Promise<Sensor> {
    const dto = await this.ds.createSensor(sensor as Partial<SensorResponseDto>);
    return this.toEntity(dto);
  }

  async update(id: string, sensor: Partial<Sensor>): Promise<Sensor> {
    const dto = await this.ds.updateSensor(id, sensor as Partial<SensorResponseDto>);
    return this.toEntity(dto);
  }

  async delete(id: string): Promise<void> {
    await this.ds.deleteSensor(id);
  }

  private toEntity(d: SensorResponseDto): Sensor {
    return {
      id: d.id,
      name: d.name,
      type: d.type,
      unit: d.unit,
      minRange: d.minRange,
      maxRange: d.maxRange,
      deviceId: d.deviceId,
      deviceName: d.deviceName,
      locationId: d.locationId,
      locationName: d.locationName,
      status: d.status as Sensor['status'],
      lastCalibration: d.lastCalibration ? new Date(d.lastCalibration) : undefined,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }
}
