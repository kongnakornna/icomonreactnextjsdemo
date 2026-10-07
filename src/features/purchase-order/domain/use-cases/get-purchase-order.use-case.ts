import { IPurchaseOrderRepository } from '../repositories/purchase-order.repository';
import { PurchaseOrder } from '../entities/purchase-order.entity';

export class GetPurchaseOrderUseCase {
  constructor(private repo: IPurchaseOrderRepository) {}

  async execute(id: string): Promise<PurchaseOrder> {
    return this.repo.getById(id);
  }
}
