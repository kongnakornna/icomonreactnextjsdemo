import { IWebOrderRepository } from '../repositories/web-order.repository';
import { WebOrder, OrderStatus } from '../entities/web-order.entity';

export class UpdateWebOrderStatusUseCase {
  constructor(private repo: IWebOrderRepository) {}

  async execute(id: string, status: OrderStatus): Promise<WebOrder> {
    return this.repo.updateStatus(id, status);
  }
}
