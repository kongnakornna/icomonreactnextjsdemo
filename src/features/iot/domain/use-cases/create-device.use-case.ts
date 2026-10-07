import { IDeviceRepository } from '../repositories/device.repository';
import { Device } from '../entities/device.entity';

export class CreateDeviceUseCase {
  constructor(private repo: IDeviceRepository) {}

  async execute(device: Partial<Device>): Promise<Device> {
    return this.repo.create(device);
  }
}
