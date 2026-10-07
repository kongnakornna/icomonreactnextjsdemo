import type { Customer } from '@/src/entities/models/customer';

export interface ICustomersRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Promise<{ data: Customer[]; total: number }>;
  getById(id: string): Promise<Customer | undefined>;
  create(customer: Partial<Customer>): Promise<Customer>;
  update(id: string, customer: Partial<Customer>): Promise<Customer>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<Customer[]>;
}
