import { IPaymentRepository } from '../repositories/payment.repository';
import { Payment } from '../entities/payment.entity';

export class CreatePaymentUseCase {
  constructor(private repo: IPaymentRepository) {}

  async execute(data: Omit<Payment, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
    return this.repo.create(data);
  }
}
