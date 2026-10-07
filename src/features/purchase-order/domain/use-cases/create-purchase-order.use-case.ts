import { IPurchaseOrderRepository } from '../repositories/purchase-order.repository';
import { PurchaseOrder } from '../entities/purchase-order.entity';

export class CreatePurchaseOrderUseCase {
  constructor(private repo: IPurchaseOrderRepository) {}

  async execute(data: Omit<PurchaseOrder, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<PurchaseOrder> {
    return this.repo.create(data);
  }
}
