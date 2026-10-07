import { IDeviceRepository } from '../../domain/repositories/device.repository';
import { Device, SensorData, GpsData } from '../../domain/entities/device.entity';
import { DeviceApiDataSource } from '../datasources/device.api.datasource';
import { DeviceResponseDto, SensorDataResponseDto, GpsDataResponseDto } from '../dtos/device.dto';

export class DeviceRepositoryImpl implements IDeviceRepository {
  constructor(private ds: DeviceApiDataSource) {}

  async list(params?: { search?: string; page?: number; pageSize?: number; type?: string; status?: string }): Promise<{ data: Device[]; total: number }> {
    const result = await this.ds.list(params);
    return {
      data: result.data.map(d => this.toEntity(d)),
      total: result.total,
    };
  }

  async getById(id: string): Promise<Device | undefined> {
    try {
      const dto = await this.ds.getById(id);
      return this.toEntity(dto);
    } catch {
      return undefined;
    }
  }

  async create(device: Partial<Device>): Promise<Device> {
    const dto = await this.ds.create(device as Partial<DeviceResponseDto>);
    return this.toEntity(dto);
  }

  async update(id: string, device: Partial<Device>): Promise<Device> {
    const dto = await this.ds.update(id, device as Partial<DeviceResponseDto>);
    return this.toEntity(dto);
  }

  async delete(id: string): Promise<void> {
    await this.ds.delete(id);
  }

  async getSensorData(deviceId: string, params?: { startDate?: Date; endDate?: Date }): Promise<SensorData[]> {
    const dtos = await this.ds.getSensorData(deviceId, {
      startDate: params?.startDate?.toISOString(),
      endDate: params?.endDate?.toISOString(),
    });
    return dtos.map(d => this.toSensorEntity(d));
  }

  async getGpsData(deviceId: string): Promise<GpsData[]> {
    const dtos = await this.ds.getGpsData(deviceId);
    return dtos.map(d => this.toGpsEntity(d));
  }

  private toEntity(d: DeviceResponseDto): Device {
    return {
      id: d.id,
      name: d.name,
      type: d.type as Device['type'],
      status: d.status as Device['status'],
      locationId: d.locationId,
      locationName: d.locationName,
      ip: d.ip,
      mac: d.mac,
      firmware: d.firmware,
      lastSeen: d.lastSeen ? new Date(d.lastSeen) : undefined,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }

  private toSensorEntity(d: SensorDataResponseDto): SensorData {
    return {
      id: d.id,
      deviceId: d.deviceId,
      type: d.type,
      value: d.value,
      unit: d.unit,
      timestamp: new Date(d.timestamp),
    };
  }

  private toGpsEntity(d: GpsDataResponseDto): GpsData {
    return {
      id: d.id,
      deviceId: d.deviceId,
      latitude: d.latitude,
      longitude: d.longitude,
      altitude: d.altitude,
      speed: d.speed,
      timestamp: new Date(d.timestamp),
    };
  }
}
