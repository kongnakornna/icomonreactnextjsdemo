import { WebOrderResponseDto, PaginatedWebOrdersResponseDto } from '../dtos/web-order.dto';
import { WebOrderListParams, OrderStatus } from '../../domain/entities/web-order.entity';

export class WebOrderApiDataSource {
  private baseUrl = '/api/wos/orders';

  async list(params?: WebOrderListParams): Promise<PaginatedWebOrdersResponseDto> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.channel) searchParams.set('channel', params.channel);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    const query = searchParams.toString();
    const response = await fetch(`${this.baseUrl}${query ? `?${query}` : ''}`);
    return response.json();
  }

  async getById(id: string): Promise<WebOrderResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  async create(data: Record<string, unknown>): Promise<WebOrderResponseDto> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async updateStatus(id: string, status: OrderStatus): Promise<WebOrderResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return response.json();
  }

  async cancel(id: string): Promise<WebOrderResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}/cancel`, {
      method: 'POST',
    });
    return response.json();
  }
}
