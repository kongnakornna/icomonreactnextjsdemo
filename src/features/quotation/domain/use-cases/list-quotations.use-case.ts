import { IQuotationRepository, ListQuotationsParams } from '../repositories/quotation.repository';
import { Quotation } from '../entities/quotation.entity';

export class ListQuotationsUseCase {
  constructor(private repo: IQuotationRepository) {}

  async execute(params?: ListQuotationsParams): Promise<{ data: Quotation[]; total: number }> {
    return this.repo.list(params);
  }
}
