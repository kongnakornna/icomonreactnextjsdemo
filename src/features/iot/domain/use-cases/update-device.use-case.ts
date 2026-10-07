import { IDeviceRepository } from '../repositories/device.repository';
import { Device } from '../entities/device.entity';

export class UpdateDeviceUseCase {
  constructor(private repo: IDeviceRepository) {}

  async execute(id: string, device: Partial<Device>): Promise<Device> {
    return this.repo.update(id, device);
  }
}
