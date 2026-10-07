import { IQuotationRepository } from '../repositories/quotation.repository';
import { Quotation } from '../entities/quotation.entity';

export class CreateQuotationUseCase {
  constructor(private repo: IQuotationRepository) {}

  async execute(data: Omit<Quotation, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Quotation> {
    return this.repo.create(data);
  }
}
