import type { ISensorsRepository } from '@/src/application/repositories/sensors.repository.interface';
import type { Sensor } from '@/src/entities/models/sensor';

export class InFileSensorsRepository implements ISensorsRepository {
  private sensors: Sensor[] = [];

  async list(params?: { search?: string; page?: number; pageSize?: number; type?: string }): Promise<{ data: Sensor[]; total: number }> {
    let filtered = [...this.sensors];

    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(s => s.name.toLowerCase().includes(search));
    }

    if (params?.type) {
      filtered = filtered.filter(s => s.type === params.type);
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

  async getById(id: string): Promise<Sensor | undefined> {
    return this.sensors.find(s => s.id === id);
  }

  async create(sensor: Partial<Sensor>): Promise<Sensor> {
    const newSensor: Sensor = {
      id: Math.random().toString(36).substring(2, 15),
      name: sensor.name || '',
      type: sensor.type || '',
      unit: sensor.unit || '',
      minRange: sensor.minRange,
      maxRange: sensor.maxRange,
      deviceId: sensor.deviceId,
      deviceName: sensor.deviceName,
      locationId: sensor.locationId,
      locationName: sensor.locationName,
      status: sensor.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.sensors.push(newSensor);
    return newSensor;
  }

  async update(id: string, sensor: Partial<Sensor>): Promise<Sensor> {
    const index = this.sensors.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Sensor not found');

    this.sensors[index] = {
      ...this.sensors[index],
      ...sensor,
      updatedAt: new Date(),
    };
    return this.sensors[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.sensors.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Sensor not found');
    this.sensors.splice(index, 1);
  }
}
