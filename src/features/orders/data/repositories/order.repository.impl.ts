import { Order } from '../../domain/entities/order.entity';
import { IOrderRepository } from '../../domain/repositories/order.repository';
import { OrderApiDatasource } from '../datasources/order.api.datasource';

export class OrderRepositoryImpl implements IOrderRepository {
  constructor(private readonly datasource: OrderApiDatasource) {}

  async create(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    return this.datasource.create(order as any) as unknown as Order;
  }

  async getById(id: string): Promise<Order | null> {
    return this.datasource.getById(id) as unknown as Order | null;
  }
}
