import type { IWebOrdersRepository } from '@/src/application/repositories/web-orders.repository.interface';
import type { WebOrder } from '@/src/entities/models/web-order';

export class InFileWebOrdersRepository implements IWebOrdersRepository {
  private orders: WebOrder[] = [];

  async list(params?: { search?: string; page?: number; pageSize?: number; status?: string }): Promise<{ data: WebOrder[]; total: number }> {
    let filtered = [...this.orders];

    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(
        o => o.orderNo.toLowerCase().includes(search) || o.customerName.toLowerCase().includes(search)
      );
    }

    if (params?.status) {
      filtered = filtered.filter(o => o.status === params.status);
    }

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      data: filtered.slice(start, end),
      total: filtered.length,
    };
  }

  async getById(id: string): Promise<WebOrder | undefined> {
    return this.orders.find(o => o.id === id);
  }

  async create(order: Partial<WebOrder>): Promise<WebOrder> {
    const newOrder: WebOrder = {
      id: Math.random().toString(36).substring(2, 15),
      orderNo: `WO-${Date.now()}`,
      customerId: order.customerId || '',
      customerName: order.customerName || '',
      status: order.status || 'pending',
      items: order.items || [],
      totalAmount: order.totalAmount || 0,
      notes: order.notes,
      dueDate: order.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  async update(id: string, order: Partial<WebOrder>): Promise<WebOrder> {
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Order not found');

    this.orders[index] = {
      ...this.orders[index],
      ...order,
      updatedAt: new Date(),
    };
    return this.orders[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Order not found');
    this.orders.splice(index, 1);
  }

  async getByCustomerId(customerId: string): Promise<WebOrder[]> {
    return this.orders.filter(o => o.customerId === customerId);
  }
}
