import { ICustomerRepository } from '../../domain/repositories/customer.repository';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerApiDataSource } from '../datasources/customer.api.datasource';
import { CustomerResponseDto } from '../dtos/customer.dto';

export class CustomerRepositoryImpl implements ICustomerRepository {
  constructor(private ds: CustomerApiDataSource) {}

  async list(params?: { search?: string; page?: number; pageSize?: number }): Promise<{ data: Customer[]; total: number }> {
    const result = await this.ds.list(params);
    return {
      data: result.data.map(d => this.toEntity(d)),
      total: result.total,
    };
  }

  async getById(id: string): Promise<Customer | undefined> {
    try {
      const dto = await this.ds.getById(id);
      return this.toEntity(dto);
    } catch {
      return undefined;
    }
  }

  async create(customer: Partial<Customer>): Promise<Customer> {
    const dto = await this.ds.create(customer as Partial<CustomerResponseDto>);
    return this.toEntity(dto);
  }

  async update(id: string, customer: Partial<Customer>): Promise<Customer> {
    const dto = await this.ds.update(id, customer as Partial<CustomerResponseDto>);
    return this.toEntity(dto);
  }

  async delete(id: string): Promise<void> {
    await this.ds.delete(id);
  }

  async search(query: string): Promise<Customer[]> {
    const result = await this.ds.list({ search: query });
    return result.data.map(d => this.toEntity(d));
  }

  private toEntity(d: CustomerResponseDto): Customer {
    return {
      id: d.id,
      companyName: d.companyName,
      taxId: d.taxId,
      address: d.address,
      city: d.city,
      country: d.country,
      postalCode: d.postalCode,
      phone: d.phone,
      email: d.email,
      website: d.website,
      contacts: d.contacts || [],
      notes: d.notes,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }
}
