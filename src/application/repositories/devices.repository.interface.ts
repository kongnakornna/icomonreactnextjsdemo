import type { Device, SensorData, GpsData } from '@/src/entities/models/device';

export interface IDevicesRepository {
  list(params?: { search?: string; page?: number; pageSize?: number; type?: string; status?: string }): Promise<{ data: Device[]; total: number }>;
  getById(id: string): Promise<Device | undefined>;
  create(device: Partial<Device>): Promise<Device>;
  update(id: string, device: Partial<Device>): Promise<Device>;
  delete(id: string): Promise<void>;
  getSensorData(deviceId: string, params?: { startDate?: Date; endDate?: Date }): Promise<SensorData[]>;
  getGpsData(deviceId: string): Promise<GpsData[]>;
}
