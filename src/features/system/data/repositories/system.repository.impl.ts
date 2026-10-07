import { ISystemRepository } from '../../domain/repositories/system.repository';
import { System, ApiMetrics } from '../../domain/entities/system.entity';
import { SystemApiDatasource } from '../datasources/system.api.datasource';

export class SystemRepositoryImpl implements ISystemRepository {
  private datasource: SystemApiDatasource;

  constructor() {
    this.datasource = new SystemApiDatasource();
  }

  async getHealth(): Promise<System> {
    return this.datasource.getHealth();
  }

  async getMetrics(): Promise<{ cpu: number; memory: number; uptime: number }> {
    return this.datasource.getMetrics();
  }

  async getApiMetric(): Promise<ApiMetrics> {
    return this.datasource.getApiMetric();
  }

  async ping(): Promise<{ latency: number }> {
    return this.datasource.ping();
  }
}
