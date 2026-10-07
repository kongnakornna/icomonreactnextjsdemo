import { IHardwareRepository } from '../repositories/hardware.repository';
import { Hardware } from '../entities/settings.entity';

export class ListHardwareUseCase {
  constructor(private repo: IHardwareRepository) {}

  async execute(params?: { search?: string; page?: number; pageSize?: number; type?: string }): Promise<{ data: Hardware[]; total: number }> {
    return this.repo.list(params);
  }
}

export class CreateHardwareUseCase {
  constructor(private repo: IHardwareRepository) {}

  async execute(hardware: Partial<Hardware>): Promise<Hardware> {
    return this.repo.create(hardware);
  }
}

export class GetHardwareUseCase {
  constructor(private repo: IHardwareRepository) {}

  async execute(id: string): Promise<Hardware | undefined> {
    return this.repo.getById(id);
  }
}

export class UpdateHardwareUseCase {
  constructor(private repo: IHardwareRepository) {}

  async execute(id: string, hardware: Partial<Hardware>): Promise<Hardware> {
    return this.repo.update(id, hardware);
  }
}

export class DeleteHardwareUseCase {
  constructor(private repo: IHardwareRepository) {}

  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
