import { Payment, Invoice } from '../entities/payment.entity';

export interface ListPaymentsParams {
  page?: number;
  limit?: number;
  status?: string;
  customerId?: string;
  search?: string;
}

export interface IPaymentRepository {
  list(params?: ListPaymentsParams): Promise<{ data: Payment[]; total: number }>;
  getById(id: string): Promise<Payment>;
  create(data: Omit<Payment, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Payment>;
  verify(id: string): Promise<Payment>;
  generateInvoice(id: string): Promise<Invoice>;
}
