import {
  PurchaseOrderResponseDto,
  ListPurchaseOrdersResponseDto,
  CreatePurchaseOrderRequestDto,
} from '../dtos/purchase-order.dto';

export class PurchaseOrderApiDataSource {
  private baseUrl = '/api/purchase-orders';

  async list(params?: Record<string, string>): Promise<ListPurchaseOrdersResponseDto> {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await fetch(`${this.baseUrl}${query}`);
    return response.json();
  }

  async getById(id: string): Promise<PurchaseOrderResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  async create(data: CreatePurchaseOrderRequestDto): Promise<PurchaseOrderResponseDto> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async update(id: string, data: Partial<CreatePurchaseOrderRequestDto>): Promise<PurchaseOrderResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async approve(id: string): Promise<PurchaseOrderResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}/approve`, {
      method: 'POST',
    });
    return response.json();
  }
}
