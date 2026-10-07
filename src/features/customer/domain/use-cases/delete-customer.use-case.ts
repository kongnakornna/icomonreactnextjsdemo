import { ICustomerRepository } from '../repositories/customer.repository';

export class DeleteCustomerUseCase {
  constructor(private repo: ICustomerRepository) {}

  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
