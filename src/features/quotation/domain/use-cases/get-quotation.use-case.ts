import { IQuotationRepository } from '../repositories/quotation.repository';
import { Quotation } from '../entities/quotation.entity';

export class GetQuotationUseCase {
  constructor(private repo: IQuotationRepository) {}

  async execute(id: string): Promise<Quotation> {
    return this.repo.getById(id);
  }
}
