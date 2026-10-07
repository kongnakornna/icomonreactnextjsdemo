import { Order } from '../entities/order.entity';

export interface IOrderRepository {
  create(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order>;
  getById(id: string): Promise<Order | null>;
}
