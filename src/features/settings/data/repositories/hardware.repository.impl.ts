import { IHardwareRepository } from '../../domain/repositories/hardware.repository';
import { Hardware } from '../../domain/entities/settings.entity';
import { SettingsApiDataSource } from '../datasources/settings.api.datasource';
import { HardwareResponseDto } from '../dtos/settings.dto';

export class HardwareRepositoryImpl implements IHardwareRepository {
  constructor(private ds: SettingsApiDataSource) {}

  async list(params?: { search?: string; page?: number; pageSize?: number; type?: string }): Promise<{ data: Hardware[]; total: number }> {
    const result = await this.ds.listHardware(params);
    return {
      data: result.data.map(d => this.toEntity(d)),
      total: result.total,
    };
  }

  async getById(id: string): Promise<Hardware | undefined> {
    try {
      const dto = await this.ds.getHardwareById(id);
      return this.toEntity(dto);
    } catch {
      return undefined;
    }
  }

  async create(hardware: Partial<Hardware>): Promise<Hardware> {
    const dto = await this.ds.createHardware(hardware as Partial<HardwareResponseDto>);
    return this.toEntity(dto);
  }

  async update(id: string, hardware: Partial<Hardware>): Promise<Hardware> {
    const dto = await this.ds.updateHardware(id, hardware as Partial<HardwareResponseDto>);
    return this.toEntity(dto);
  }

  async delete(id: string): Promise<void> {
    await this.ds.deleteHardware(id);
  }

  private toEntity(d: HardwareResponseDto): Hardware {
    return {
      id: d.id,
      name: d.name,
      type: d.type,
      manufacturer: d.manufacturer,
      model: d.model,
      serialNumber: d.serialNumber,
      locationId: d.locationId,
      locationName: d.locationName,
      status: d.status as Hardware['status'],
      purchaseDate: d.purchaseDate ? new Date(d.purchaseDate) : undefined,
      warrantyExpiry: d.warrantyExpiry ? new Date(d.warrantyExpiry) : undefined,
      notes: d.notes,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }
}
