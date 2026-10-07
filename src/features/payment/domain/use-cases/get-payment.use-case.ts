import { IPaymentRepository } from '../repositories/payment.repository';
import { Payment } from '../entities/payment.entity';

export class GetPaymentUseCase {
  constructor(private repo: IPaymentRepository) {}

  async execute(id: string): Promise<Payment> {
    return this.repo.getById(id);
  }
}
