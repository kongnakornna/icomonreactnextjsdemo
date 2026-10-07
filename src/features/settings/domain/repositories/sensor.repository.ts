import { Sensor } from '../entities/settings.entity';

export interface ISensorRepository {
  list(params?: { search?: string; page?: number; pageSize?: number; type?: string }): Promise<{ data: Sensor[]; total: number }>;
  getById(id: string): Promise<Sensor | undefined>;
  create(sensor: Partial<Sensor>): Promise<Sensor>;
  update(id: string, sensor: Partial<Sensor>): Promise<Sensor>;
  delete(id: string): Promise<void>;
}
