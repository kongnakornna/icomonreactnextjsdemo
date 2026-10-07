import { IAiAnalyticsRepository } from '../../domain/repositories/ai-analytics.repository';
import { Alert } from '../../domain/entities/alert.entity';
import { DashboardStats } from '../../domain/entities/dashboard.entity';
import { DataAnalyst } from '../../domain/entities/data-analyst.entity';
import { Log } from '../../domain/entities/log.entity';
import { Report } from '../../domain/entities/report.entity';
import { Schedule } from '../../domain/entities/schedule.entity';
import { Workflow } from '../../domain/entities/workflow.entity';
import { AiAnalyticsApiDatasource } from '../datasources/ai-analytics.api.datasource';

export class AiAnalyticsRepositoryImpl implements IAiAnalyticsRepository {
  private datasource: AiAnalyticsApiDatasource;

  constructor() {
    this.datasource = new AiAnalyticsApiDatasource();
  }

  async getAlerts(): Promise<Alert[]> {
    return this.datasource.getAlerts();
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return this.datasource.getDashboardStats();
  }

  async getInsights(): Promise<DataAnalyst[]> {
    return this.datasource.getInsights();
  }

  async getLogs(): Promise<Log[]> {
    return this.datasource.getLogs();
  }

  async getReports(): Promise<Report[]> {
    return this.datasource.getReports();
  }

  async getSchedules(): Promise<Schedule[]> {
    return this.datasource.getSchedules();
  }

  async getTasks(): Promise<{ id: string; name: string; status: string }[]> {
    return this.datasource.getTasks();
  }

  async getWorkflows(): Promise<Workflow[]> {
    return this.datasource.getWorkflows();
  }
}
