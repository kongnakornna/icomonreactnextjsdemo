import { IPurchaseOrderRepository } from '../repositories/purchase-order.repository';
import { PurchaseOrder } from '../entities/purchase-order.entity';

export class UpdatePurchaseOrderUseCase {
  constructor(private repo: IPurchaseOrderRepository) {}

  async execute(id: string, data: Partial<PurchaseOrder>): Promise<PurchaseOrder> {
    return this.repo.update(id, data);
  }
}
