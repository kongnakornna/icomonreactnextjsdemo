import { IPaymentRepository } from '../repositories/payment.repository';
import { Payment } from '../entities/payment.entity';

export class VerifyPaymentUseCase {
  constructor(private repo: IPaymentRepository) {}

  async execute(id: string): Promise<Payment> {
    return this.repo.verify(id);
  }
}
