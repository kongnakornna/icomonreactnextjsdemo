import { ILocationRepository } from '../repositories/location.repository';
import { Location } from '../entities/settings.entity';

export class ListLocationsUseCase {
  constructor(private repo: ILocationRepository) {}

  async execute(params?: { search?: string; page?: number; pageSize?: number }): Promise<{ data: Location[]; total: number }> {
    return this.repo.list(params);
  }
}

export class CreateLocationUseCase {
  constructor(private repo: ILocationRepository) {}

  async execute(location: Partial<Location>): Promise<Location> {
    return this.repo.create(location);
  }
}

export class GetLocationUseCase {
  constructor(private repo: ILocationRepository) {}

  async execute(id: string): Promise<Location | undefined> {
    return this.repo.getById(id);
  }
}

export class UpdateLocationUseCase {
  constructor(private repo: ILocationRepository) {}

  async execute(id: string, location: Partial<Location>): Promise<Location> {
    return this.repo.update(id, location);
  }
}

export class DeleteLocationUseCase {
  constructor(private repo: ILocationRepository) {}

  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
