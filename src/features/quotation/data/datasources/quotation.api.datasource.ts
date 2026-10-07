import {
  QuotationResponseDto,
  ListQuotationsResponseDto,
  CreateQuotationRequestDto,
} from '../dtos/quotation.dto';

export class QuotationApiDataSource {
  private baseUrl = '/api/quotations';

  async list(params?: Record<string, string>): Promise<ListQuotationsResponseDto> {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await fetch(`${this.baseUrl}${query}`);
    return response.json();
  }

  async getById(id: string): Promise<QuotationResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  async create(data: CreateQuotationRequestDto): Promise<QuotationResponseDto> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async update(id: string, data: Partial<CreateQuotationRequestDto>): Promise<QuotationResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async approve(id: string): Promise<QuotationResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}/approve`, {
      method: 'POST',
    });
    return response.json();
  }

  async reject(id: string, reason?: string): Promise<QuotationResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    });
    return response.json();
  }
}
