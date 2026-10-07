import { IPaymentRepository, ListPaymentsParams } from '../repositories/payment.repository';
import { Payment } from '../entities/payment.entity';

export class ListPaymentsUseCase {
  constructor(private repo: IPaymentRepository) {}

  async execute(params?: ListPaymentsParams): Promise<{ data: Payment[]; total: number }> {
    return this.repo.list(params);
  }
}
