import { OrderDto } from '../dtos/order.dto';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export class OrderApiDatasource {
  async create(order: Omit<OrderDto, 'id' | 'createdAt'>): Promise<OrderDto> {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  }

  async getById(id: string): Promise<OrderDto | null> {
    const response = await fetch(`${API_BASE}/orders/${id}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  }
}
