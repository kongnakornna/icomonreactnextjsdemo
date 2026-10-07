import { JobCardResponseDto, CreateJobCardRequestDto } from '../dtos/job-card.dto';

export class JobCardApiDataSource {
  private baseUrl = '/api/job-cards';

  async list(params?: { search?: string; page?: number; pageSize?: number; status?: string; priority?: string }): Promise<{ data: JobCardResponseDto[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
    if (params?.status) searchParams.set('status', params.status);
    if (params?.priority) searchParams.set('priority', params.priority);

    const response = await fetch(`${this.baseUrl}?${searchParams.toString()}`);
    return response.json();
  }

  async getById(id: string): Promise<JobCardResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  async create(job: CreateJobCardRequestDto): Promise<JobCardResponseDto> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    });
    return response.json();
  }

  async update(id: string, job: Partial<JobCardResponseDto>): Promise<JobCardResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    });
    return response.json();
  }

  async updateStatus(id: string, status: string): Promise<JobCardResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return response.json();
  }

  async assign(id: string, assigneeId: string): Promise<JobCardResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assigneeId }),
    });
    return response.json();
  }
}
