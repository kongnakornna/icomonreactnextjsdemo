import type { WebOrder } from '@/src/entities/models/web-order';

export interface IWebOrdersRepository {
  list(params?: { search?: string; page?: number; pageSize?: number; status?: string }): Promise<{ data: WebOrder[]; total: number }>;
  getById(id: string): Promise<WebOrder | undefined>;
  create(order: Partial<WebOrder>): Promise<WebOrder>;
  update(id: string, order: Partial<WebOrder>): Promise<WebOrder>;
  delete(id: string): Promise<void>;
  getByCustomerId(customerId: string): Promise<WebOrder[]>;
}
