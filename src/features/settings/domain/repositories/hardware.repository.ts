import { Hardware } from '../entities/settings.entity';

export interface IHardwareRepository {
  list(params?: { search?: string; page?: number; pageSize?: number; type?: string }): Promise<{ data: Hardware[]; total: number }>;
  getById(id: string): Promise<Hardware | undefined>;
  create(hardware: Partial<Hardware>): Promise<Hardware>;
  update(id: string, hardware: Partial<Hardware>): Promise<Hardware>;
  delete(id: string): Promise<void>;
}
