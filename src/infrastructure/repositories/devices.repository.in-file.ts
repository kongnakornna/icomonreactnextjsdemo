import type { IDevicesRepository } from '@/src/application/repositories/devices.repository.interface';
import type { Device, SensorData, GpsData } from '@/src/entities/models/device';

export class InFileDevicesRepository implements IDevicesRepository {
  private devices: Device[] = [];

  async list(params?: { search?: string; page?: number; pageSize?: number; type?: string; status?: string }): Promise<{ data: Device[]; total: number }> {
    let filtered = [...this.devices];

    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(d => d.name.toLowerCase().includes(search));
    }

    if (params?.type) {
      filtered = filtered.filter(d => d.type === params.type);
    }

    if (params?.status) {
      filtered = filtered.filter(d => d.status === params.status);
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

  async getById(id: string): Promise<Device | undefined> {
    return this.devices.find(d => d.id === id);
  }

  async create(device: Partial<Device>): Promise<Device> {
    const newDevice: Device = {
      id: Math.random().toString(36).substring(2, 15),
      name: device.name || '',
      type: device.type || 'sensor',
      status: device.status || 'offline',
      locationId: device.locationId,
      locationName: device.locationName,
      ip: device.ip,
      mac: device.mac,
      firmware: device.firmware,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.devices.push(newDevice);
    return newDevice;
  }

  async update(id: string, device: Partial<Device>): Promise<Device> {
    const index = this.devices.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Device not found');

    this.devices[index] = {
      ...this.devices[index],
      ...device,
      updatedAt: new Date(),
    };
    return this.devices[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.devices.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Device not found');
    this.devices.splice(index, 1);
  }

  async getSensorData(deviceId: string, params?: { startDate?: Date; endDate?: Date }): Promise<SensorData[]> {
    return [];
  }

  async getGpsData(deviceId: string): Promise<GpsData[]> {
    return [];
  }
}
