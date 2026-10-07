import type { ICustomersRepository } from '@/src/application/repositories/customers.repository.interface';
import type { Customer } from '@/src/entities/models/customer';

export class InFileCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  async list(params?: { search?: string; page?: number; pageSize?: number }): Promise<{ data: Customer[]; total: number }> {
    let filtered = [...this.customers];

    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(
        c => c.companyName.toLowerCase().includes(search) || c.email?.toLowerCase().includes(search)
      );
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

  async getById(id: string): Promise<Customer | undefined> {
    return this.customers.find(c => c.id === id);
  }

  async create(customer: Partial<Customer>): Promise<Customer> {
    const newCustomer: Customer = {
      id: Math.random().toString(36).substring(2, 15),
      companyName: customer.companyName || '',
      taxId: customer.taxId,
      address: customer.address,
      city: customer.city,
      country: customer.country,
      phone: customer.phone,
      email: customer.email,
      website: customer.website,
      contacts: customer.contacts || [],
      notes: customer.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  async update(id: string, customer: Partial<Customer>): Promise<Customer> {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Customer not found');

    this.customers[index] = {
      ...this.customers[index],
      ...customer,
      updatedAt: new Date(),
    };
    return this.customers[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Customer not found');
    this.customers.splice(index, 1);
  }

  async search(query: string): Promise<Customer[]> {
    const search = query.toLowerCase();
    return this.customers.filter(
      c => c.companyName.toLowerCase().includes(search) || c.email?.toLowerCase().includes(search)
    );
  }
}
