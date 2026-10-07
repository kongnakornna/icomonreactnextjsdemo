import { IPaymentRepository } from '../repositories/payment.repository';
import { Invoice } from '../entities/payment.entity';

export class GenerateInvoiceUseCase {
  constructor(private repo: IPaymentRepository) {}

  async execute(id: string): Promise<Invoice> {
    return this.repo.generateInvoice(id);
  }
}
