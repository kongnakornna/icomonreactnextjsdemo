import { Quotation } from '../entities/quotation.entity';

export interface ListQuotationsParams {
  page?: number;
  limit?: number;
  status?: string;
  customerId?: string;
  search?: string;
}

export interface IQuotationRepository {
  list(params?: ListQuotationsParams): Promise<{ data: Quotation[]; total: number }>;
  getById(id: string): Promise<Quotation>;
  create(data: Omit<Quotation, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Quotation>;
  update(id: string, data: Partial<Quotation>): Promise<Quotation>;
  approve(id: string): Promise<Quotation>;
  reject(id: string, reason?: string): Promise<Quotation>;
}
