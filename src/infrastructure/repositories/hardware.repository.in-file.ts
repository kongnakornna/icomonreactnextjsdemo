import type { IHardwareRepository } from '@/src/application/repositories/hardware.repository.interface';
import type { Hardware } from '@/src/entities/models/hardware';

export class InFileHardwareRepository implements IHardwareRepository {
  private hardware: Hardware[] = [];

  async list(params?: { search?: string; page?: number; pageSize?: number; type?: string }): Promise<{ data: Hardware[]; total: number }> {
    let filtered = [...this.hardware];

    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(h => h.name.toLowerCase().includes(search));
    }

    if (params?.type) {
      filtered = filtered.filter(h => h.type === params.type);
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

  async getById(id: string): Promise<Hardware | undefined> {
    return this.hardware.find(h => h.id === id);
  }

  async create(hardware: Partial<Hardware>): Promise<Hardware> {
    const newHardware: Hardware = {
      id: Math.random().toString(36).substring(2, 15),
      name: hardware.name || '',
      type: hardware.type || '',
      manufacturer: hardware.manufacturer,
      model: hardware.model,
      serialNumber: hardware.serialNumber,
      locationId: hardware.locationId,
      locationName: hardware.locationName,
      status: hardware.status || 'active',
      purchaseDate: hardware.purchaseDate,
      warrantyExpiry: hardware.warrantyExpiry,
      notes: hardware.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.hardware.push(newHardware);
    return newHardware;
  }

  async update(id: string, hardware: Partial<Hardware>): Promise<Hardware> {
    const index = this.hardware.findIndex(h => h.id === id);
    if (index === -1) throw new Error('Hardware not found');

    this.hardware[index] = {
      ...this.hardware[index],
      ...hardware,
      updatedAt: new Date(),
    };
    return this.hardware[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.hardware.findIndex(h => h.id === id);
    if (index === -1) throw new Error('Hardware not found');
    this.hardware.splice(index, 1);
  }
}
