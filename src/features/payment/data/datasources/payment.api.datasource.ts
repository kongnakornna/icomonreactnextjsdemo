import {
  PaymentResponseDto,
  InvoiceResponseDto,
  ListPaymentsResponseDto,
  CreatePaymentRequestDto,
} from '../dtos/payment.dto';

export class PaymentApiDataSource {
  private baseUrl = '/api/payments';

  async list(params?: Record<string, string>): Promise<ListPaymentsResponseDto> {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await fetch(`${this.baseUrl}${query}`);
    return response.json();
  }

  async getById(id: string): Promise<PaymentResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  async create(data: CreatePaymentRequestDto): Promise<PaymentResponseDto> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async verify(id: string): Promise<PaymentResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}/verify`, {
      method: 'POST',
    });
    return response.json();
  }

  async generateInvoice(id: string): Promise<InvoiceResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}/invoice`, {
      method: 'POST',
    });
    return response.json();
  }
}
