import { ISystemRepository } from '../../domain/repositories/system.repository';
import { System, ApiMetrics } from '../../domain/entities/system.entity';

export class SystemApiDatasource implements ISystemRepository {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseUrl = baseUrl;
  }

  async getHealth(): Promise<System> {
    const response = await fetch(`${this.baseUrl}/api/system/health`);
    if (!response.ok) throw new Error('Failed to fetch system health');
    return response.json();
  }

  async getMetrics(): Promise<{ cpu: number; memory: number; uptime: number }> {
    const response = await fetch(`${this.baseUrl}/api/system/metrics`);
    if (!response.ok) throw new Error('Failed to fetch system metrics');
    return response.json();
  }

  async getApiMetric(): Promise<ApiMetrics> {
    const response = await fetch(`${this.baseUrl}/api/system/api-metrics`);
    if (!response.ok) throw new Error('Failed to fetch API metrics');
    return response.json();
  }

  async ping(): Promise<{ latency: number }> {
    const start = Date.now();
    const response = await fetch(`${this.baseUrl}/api/system/ping`);
    if (!response.ok) throw new Error('Failed to ping');
    const latency = Date.now() - start;
    return { latency };
  }
}
