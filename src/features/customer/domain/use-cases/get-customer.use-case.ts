import { ICustomerRepository } from '../repositories/customer.repository';
import { Customer } from '../entities/customer.entity';

export class GetCustomerUseCase {
  constructor(private repo: ICustomerRepository) {}

  async execute(id: string): Promise<Customer | undefined> {
    return this.repo.getById(id);
  }
}
