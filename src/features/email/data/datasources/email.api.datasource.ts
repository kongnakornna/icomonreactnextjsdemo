import { apiFetch } from '@/src/core/utils/api-fetch';
import {
  SendEmailRequestDto,
  SendBulkEmailRequestDto,
  EmailLogResponseDto,
  EmailTemplateResponseDto,
  CreateEmailTemplateRequestDto,
} from '../dtos/email.dto';

export class EmailApiDataSource {
  private baseUrl = '/api/email';

  async send(to: string, subject: string, body: string): Promise<void> {
    await apiFetch<void>(`${this.baseUrl}/send`, {
      method: 'POST',
      body: JSON.stringify({ to, subject, body } as SendEmailRequestDto),
    });
  }

  async sendBulk(recipients: string[], subject: string, body: string): Promise<void> {
    await apiFetch<void>(`${this.baseUrl}/send-bulk`, {
      method: 'POST',
      body: JSON.stringify({ recipients, subject, body } as SendBulkEmailRequestDto),
    });
  }

  async getLogs(params?: { status?: string; page?: number; pageSize?: number }): Promise<{ data: EmailLogResponseDto[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
    const query = searchParams.toString();
    return apiFetch<{ data: EmailLogResponseDto[]; total: number }>(`${this.baseUrl}/logs${query ? `?${query}` : ''}`);
  }

  async getTemplates(): Promise<EmailTemplateResponseDto[]> {
    return apiFetch<EmailTemplateResponseDto[]>(`${this.baseUrl}/templates`);
  }

  async createTemplate(template: CreateEmailTemplateRequestDto): Promise<EmailTemplateResponseDto> {
    return apiFetch<EmailTemplateResponseDto>(`${this.baseUrl}/templates`, {
      method: 'POST',
      body: JSON.stringify(template),
    });
  }
}
