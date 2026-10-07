import { IPurchaseOrderRepository, ListPurchaseOrdersParams } from '../repositories/purchase-order.repository';
import { PurchaseOrder } from '../entities/purchase-order.entity';

export class ListPurchaseOrdersUseCase {
  constructor(private repo: IPurchaseOrderRepository) {}

  async execute(params?: ListPurchaseOrdersParams): Promise<{ data: PurchaseOrder[]; total: number }> {
    return this.repo.list(params);
  }
}
