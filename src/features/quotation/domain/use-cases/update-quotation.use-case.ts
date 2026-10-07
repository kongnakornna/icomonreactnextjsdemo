import { IQuotationRepository } from '../repositories/quotation.repository';
import { Quotation } from '../entities/quotation.entity';

export class UpdateQuotationUseCase {
  constructor(private repo: IQuotationRepository) {}

  async execute(id: string, data: Partial<Quotation>): Promise<Quotation> {
    return this.repo.update(id, data);
  }
}
