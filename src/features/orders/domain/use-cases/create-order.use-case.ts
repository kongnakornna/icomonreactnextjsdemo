import { Order } from '../entities/order.entity';
import { IOrderRepository } from '../repositories/order.repository';

export class CreateOrderUseCase {
  constructor(private readonly repository: IOrderRepository) {}

  async execute(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    return this.repository.create(order);
  }
}
