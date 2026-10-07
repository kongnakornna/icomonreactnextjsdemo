import { DashboardStatsResponseDto, RevenueDataResponseDto, JobStatusSummaryResponseDto } from '../dtos/dashboard.dto';

export class DashboardApiDataSource {
  private baseUrl = '/api/dashboard';

  async getStats(): Promise<DashboardStatsResponseDto> {
    const response = await fetch(`${this.baseUrl}/stats`);
    return response.json();
  }

  async getRevenueChart(months?: number): Promise<RevenueDataResponseDto[]> {
    const params = months ? `?months=${months}` : '';
    const response = await fetch(`${this.baseUrl}/revenue${params}`);
    return response.json();
  }

  async getJobStatus(): Promise<JobStatusSummaryResponseDto> {
    const response = await fetch(`${this.baseUrl}/job-status`);
    return response.json();
  }
}
