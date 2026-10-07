import { IWebOrderRepository } from '../repositories/web-order.repository';
import { WebOrder } from '../entities/web-order.entity';

export class GetWebOrderUseCase {
  constructor(private repo: IWebOrderRepository) {}

  async execute(id: string): Promise<WebOrder> {
    return this.repo.getById(id);
  }
}
