import type { ILocationsRepository } from '@/src/application/repositories/locations.repository.interface';
import type { Location } from '@/src/entities/models/location';

export class InFileLocationsRepository implements ILocationsRepository {
  private locations: Location[] = [];

  async list(params?: { search?: string; page?: number; pageSize?: number }): Promise<{ data: Location[]; total: number }> {
    let filtered = [...this.locations];

    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(l => l.name.toLowerCase().includes(search));
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

  async getById(id: string): Promise<Location | undefined> {
    return this.locations.find(l => l.id === id);
  }

  async create(location: Partial<Location>): Promise<Location> {
    const newLocation: Location = {
      id: Math.random().toString(36).substring(2, 15),
      name: location.name || '',
      address: location.address,
      city: location.city,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      description: location.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.locations.push(newLocation);
    return newLocation;
  }

  async update(id: string, location: Partial<Location>): Promise<Location> {
    const index = this.locations.findIndex(l => l.id === id);
    if (index === -1) throw new Error('Location not found');

    this.locations[index] = {
      ...this.locations[index],
      ...location,
      updatedAt: new Date(),
    };
    return this.locations[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.locations.findIndex(l => l.id === id);
    if (index === -1) throw new Error('Location not found');
    this.locations.splice(index, 1);
  }
}
