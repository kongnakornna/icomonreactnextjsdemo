import { IPurchaseOrderRepository } from '../repositories/purchase-order.repository';
import { PurchaseOrder } from '../entities/purchase-order.entity';

export class ApprovePurchaseOrderUseCase {
  constructor(private repo: IPurchaseOrderRepository) {}

  async execute(id: string): Promise<PurchaseOrder> {
    return this.repo.approve(id);
  }
}
