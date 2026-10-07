import { IDeviceRepository } from '../repositories/device.repository';
import { Device } from '../entities/device.entity';

export class GetDeviceUseCase {
  constructor(private repo: IDeviceRepository) {}

  async execute(id: string): Promise<Device | undefined> {
    return this.repo.getById(id);
  }
}
