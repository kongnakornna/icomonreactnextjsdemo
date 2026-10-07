import { System, ApiMetrics } from '../entities/system.entity';

export interface ISystemRepository {
  getHealth(): Promise<System>;
  getMetrics(): Promise<{ cpu: number; memory: number; uptime: number }>;
  getApiMetric(): Promise<ApiMetrics>;
  ping(): Promise<{ latency: number }>;
}
