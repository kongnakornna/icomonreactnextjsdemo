import type { Location } from '@/src/entities/models/location';

export interface ILocationsRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Promise<{ data: Location[]; total: number }>;
  getById(id: string): Promise<Location | undefined>;
  create(location: Partial<Location>): Promise<Location>;
  update(id: string, location: Partial<Location>): Promise<Location>;
  delete(id: string): Promise<void>;
}
