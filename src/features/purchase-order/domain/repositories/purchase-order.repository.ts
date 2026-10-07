import { PurchaseOrder } from '../entities/purchase-order.entity';

export interface ListPurchaseOrdersParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface IPurchaseOrderRepository {
  list(params?: ListPurchaseOrdersParams): Promise<{ data: PurchaseOrder[]; total: number }>;
  getById(id: string): Promise<PurchaseOrder>;
  create(data: Omit<PurchaseOrder, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<PurchaseOrder>;
  update(id: string, data: Partial<PurchaseOrder>): Promise<PurchaseOrder>;
  approve(id: string): Promise<PurchaseOrder>;
}
