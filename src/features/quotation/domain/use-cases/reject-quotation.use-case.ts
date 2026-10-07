import { IQuotationRepository } from '../repositories/quotation.repository';
import { Quotation } from '../entities/quotation.entity';

export class RejectQuotationUseCase {
  constructor(private repo: IQuotationRepository) {}

  async execute(id: string, reason?: string): Promise<Quotation> {
    return this.repo.reject(id, reason);
  }
}
