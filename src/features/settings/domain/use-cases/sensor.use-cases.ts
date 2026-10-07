import { ISensorRepository } from '../repositories/sensor.repository';
import { Sensor } from '../entities/settings.entity';

export class ListSensorsUseCase {
  constructor(private repo: ISensorRepository) {}

  async execute(params?: { search?: string; page?: number; pageSize?: number; type?: string }): Promise<{ data: Sensor[]; total: number }> {
    return this.repo.list(params);
  }
}

export class CreateSensorUseCase {
  constructor(private repo: ISensorRepository) {}

  async execute(sensor: Partial<Sensor>): Promise<Sensor> {
    return this.repo.create(sensor);
  }
}

export class GetSensorUseCase {
  constructor(private repo: ISensorRepository) {}

  async execute(id: string): Promise<Sensor | undefined> {
    return this.repo.getById(id);
  }
}

export class UpdateSensorUseCase {
  constructor(private repo: ISensorRepository) {}

  async execute(id: string, sensor: Partial<Sensor>): Promise<Sensor> {
    return this.repo.update(id, sensor);
  }
}

export class DeleteSensorUseCase {
  constructor(private repo: ISensorRepository) {}

  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
