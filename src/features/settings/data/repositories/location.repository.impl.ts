import { ILocationRepository } from '../../domain/repositories/location.repository';
import { Location } from '../../domain/entities/settings.entity';
import { SettingsApiDataSource } from '../datasources/settings.api.datasource';
import { LocationResponseDto } from '../dtos/settings.dto';

export class LocationRepositoryImpl implements ILocationRepository {
  constructor(private ds: SettingsApiDataSource) {}

  async list(params?: { search?: string; page?: number; pageSize?: number }): Promise<{ data: Location[]; total: number }> {
    const result = await this.ds.listLocations(params);
    return {
      data: result.data.map(d => this.toEntity(d)),
      total: result.total,
    };
  }

  async getById(id: string): Promise<Location | undefined> {
    try {
      const dto = await this.ds.getLocationById(id);
      return this.toEntity(dto);
    } catch {
      return undefined;
    }
  }

  async create(location: Partial<Location>): Promise<Location> {
    const dto = await this.ds.createLocation(location as Partial<LocationResponseDto>);
    return this.toEntity(dto);
  }

  async update(id: string, location: Partial<Location>): Promise<Location> {
    const dto = await this.ds.updateLocation(id, location as Partial<LocationResponseDto>);
    return this.toEntity(dto);
  }

  async delete(id: string): Promise<void> {
    await this.ds.deleteLocation(id);
  }

  private toEntity(d: LocationResponseDto): Location {
    return {
      id: d.id,
      name: d.name,
      address: d.address,
      city: d.city,
      country: d.country,
      latitude: d.latitude,
      longitude: d.longitude,
      description: d.description,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }
}
