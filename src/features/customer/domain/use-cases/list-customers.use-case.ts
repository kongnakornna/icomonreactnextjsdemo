import { ICustomerRepository } from '../repositories/customer.repository';
import { Customer } from '../entities/customer.entity';

export class ListCustomersUseCase {
  constructor(private repo: ICustomerRepository) {}

  async execute(params?: { search?: string; page?: number; pageSize?: number }): Promise<{ data: Customer[]; total: number }> {
    return this.repo.list(params);
  }
}
