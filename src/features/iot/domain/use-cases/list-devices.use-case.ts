import { IDeviceRepository } from '../repositories/device.repository';
import { Device } from '../entities/device.entity';

export class ListDevicesUseCase {
  constructor(private repo: IDeviceRepository) {}

  async execute(params?: { search?: string; page?: number; pageSize?: number; type?: string; status?: string }): Promise<{ data: Device[]; total: number }> {
    return this.repo.list(params);
  }
}
