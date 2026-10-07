import { AlarmResponseDto } from '../dtos/alarm.dto';

export class AlarmApiDataSource {
  private baseUrl = '/api/alarms';

  async list(params?: { search?: string; page?: number; pageSize?: number; severity?: string; status?: string }): Promise<{ data: AlarmResponseDto[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
    if (params?.severity) searchParams.set('severity', params.severity);
    if (params?.status) searchParams.set('status', params.status);

    const response = await fetch(`${this.baseUrl}?${searchParams.toString()}`);
    return response.json();
  }

  async getById(id: string): Promise<AlarmResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  async acknowledge(id: string): Promise<AlarmResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}/acknowledge`, { method: 'POST' });
    return response.json();
  }
}
