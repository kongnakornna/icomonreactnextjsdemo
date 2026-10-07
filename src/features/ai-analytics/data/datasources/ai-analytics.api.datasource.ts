import { IAiAnalyticsRepository } from '../../domain/repositories/ai-analytics.repository';
import { Alert } from '../../domain/entities/alert.entity';
import { DashboardStats } from '../../domain/entities/dashboard.entity';
import { DataAnalyst } from '../../domain/entities/data-analyst.entity';
import { Log } from '../../domain/entities/log.entity';
import { Report } from '../../domain/entities/report.entity';
import { Schedule } from '../../domain/entities/schedule.entity';
import { Workflow } from '../../domain/entities/workflow.entity';

export class AiAnalyticsApiDatasource implements IAiAnalyticsRepository {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseUrl = baseUrl;
  }

  async getAlerts(): Promise<Alert[]> {
    const response = await fetch(`${this.baseUrl}/api/ai-analytics/alerts`);
    if (!response.ok) throw new Error('Failed to fetch alerts');
    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${this.baseUrl}/api/ai-analytics/dashboard-stats`);
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
  }

  async getInsights(): Promise<DataAnalyst[]> {
    const response = await fetch(`${this.baseUrl}/api/ai-analytics/insights`);
    if (!response.ok) throw new Error('Failed to fetch insights');
    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }));
  }

  async getLogs(): Promise<Log[]> {
    const response = await fetch(`${this.baseUrl}/api/ai-analytics/logs`);
    if (!response.ok) throw new Error('Failed to fetch logs');
    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }));
  }

  async getReports(): Promise<Report[]> {
    const response = await fetch(`${this.baseUrl}/api/ai-analytics/reports`);
    if (!response.ok) throw new Error('Failed to fetch reports');
    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      completedAt: item.completedAt ? new Date(item.completedAt) : undefined,
    }));
  }

  async getSchedules(): Promise<Schedule[]> {
    const response = await fetch(`${this.baseUrl}/api/ai-analytics/schedules`);
    if (!response.ok) throw new Error('Failed to fetch schedules');
    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      lastRun: item.lastRun ? new Date(item.lastRun) : undefined,
      nextRun: item.nextRun ? new Date(item.nextRun) : undefined,
    }));
  }

  async getTasks(): Promise<{ id: string; name: string; status: string }[]> {
    const response = await fetch(`${this.baseUrl}/api/ai-analytics/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  }

  async getWorkflows(): Promise<Workflow[]> {
    const response = await fetch(`${this.baseUrl}/api/ai-analytics/workflows`);
    if (!response.ok) throw new Error('Failed to fetch workflows');
    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
  }
}
