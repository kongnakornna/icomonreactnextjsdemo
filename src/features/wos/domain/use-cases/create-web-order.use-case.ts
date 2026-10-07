import { IWebOrderRepository } from '../repositories/web-order.repository';
import { WebOrder, CreateWebOrderInput } from '../entities/web-order.entity';

export class CreateWebOrderUseCase {
  constructor(private repo: IWebOrderRepository) {}

  async execute(data: CreateWebOrderInput): Promise<WebOrder> {
    return this.repo.create(data);
  }
}
