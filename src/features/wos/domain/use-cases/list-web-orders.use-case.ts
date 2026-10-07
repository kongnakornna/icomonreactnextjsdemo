import { IWebOrderRepository } from '../repositories/web-order.repository';
import { WebOrderListParams, PaginatedWebOrders } from '../entities/web-order.entity';

export class ListWebOrdersUseCase {
  constructor(private repo: IWebOrderRepository) {}

  async execute(params?: WebOrderListParams): Promise<PaginatedWebOrders> {
    return this.repo.list(params);
  }
}
