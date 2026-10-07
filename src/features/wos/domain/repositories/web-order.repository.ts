import { WebOrder, WebOrderListParams, PaginatedWebOrders, OrderStatus, CreateWebOrderInput } from '../entities/web-order.entity';

export interface IWebOrderRepository {
  list(params?: WebOrderListParams): Promise<PaginatedWebOrders>;
  getById(id: string): Promise<WebOrder>;
  create(data: CreateWebOrderInput): Promise<WebOrder>;
  updateStatus(id: string, status: OrderStatus): Promise<WebOrder>;
  cancel(id: string): Promise<WebOrder>;
}
