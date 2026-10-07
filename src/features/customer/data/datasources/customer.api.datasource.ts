import { CustomerResponseDto } from '../dtos/customer.dto';

export class CustomerApiDataSource {
  private baseUrl = '/api/customers';

  async list(params?: { search?: string; page?: number; pageSize?: number }): Promise<{ data: CustomerResponseDto[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());

    const response = await fetch(`${this.baseUrl}?${searchParams.toString()}`);
    return response.json();
  }

  async getById(id: string): Promise<CustomerResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  async create(customer: Partial<CustomerResponseDto>): Promise<CustomerResponseDto> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
    return response.json();
  }

  async update(id: string, customer: Partial<CustomerResponseDto>): Promise<CustomerResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
    return response.json();
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, { method: 'DELETE' });
  }
}
