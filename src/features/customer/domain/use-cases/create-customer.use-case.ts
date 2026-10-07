import { ICustomerRepository } from '../repositories/customer.repository';
import { Customer } from '../entities/customer.entity';

export class CreateCustomerUseCase {
  constructor(private repo: ICustomerRepository) {}

  async execute(customer: Partial<Customer>): Promise<Customer> {
    return this.repo.create(customer);
  }
}
