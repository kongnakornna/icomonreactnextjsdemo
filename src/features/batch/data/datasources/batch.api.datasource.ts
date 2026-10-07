import { apiFetch } from '@/src/core/utils/api-fetch';
import { BatchJobResponseDto, BatchJobHistoryResponseDto, CreateBatchJobRequestDto } from '../dtos/batch.dto';

export class BatchApiDataSource {
  private baseUrl = '/api/batch/jobs';

  async list(): Promise<BatchJobResponseDto[]> {
    return apiFetch<BatchJobResponseDto[]>(this.baseUrl);
  }

  async getById(id: string): Promise<BatchJobResponseDto> {
    return apiFetch<BatchJobResponseDto>(`${this.baseUrl}/${id}`);
  }

  async create(job: CreateBatchJobRequestDto): Promise<BatchJobResponseDto> {
    return apiFetch<BatchJobResponseDto>(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(job),
    });
  }

  async trigger(id: string): Promise<void> {
    await apiFetch<void>(`${this.baseUrl}/${id}/trigger`, {
      method: 'POST',
    });
  }

  async getHistory(id: string): Promise<BatchJobHistoryResponseDto[]> {
    return apiFetch<BatchJobHistoryResponseDto[]>(`${this.baseUrl}/${id}/history`);
  }
}
