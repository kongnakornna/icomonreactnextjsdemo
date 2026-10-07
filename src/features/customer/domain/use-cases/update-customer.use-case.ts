import { ICustomerRepository } from '../repositories/customer.repository';
import { Customer } from '../entities/customer.entity';

export class UpdateCustomerUseCase {
  constructor(private repo: ICustomerRepository) {}

  async execute(id: string, customer: Partial<Customer>): Promise<Customer> {
    return this.repo.update(id, customer);
  }
}
