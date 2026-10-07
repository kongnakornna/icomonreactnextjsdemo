import { Alert } from '../entities/alert.entity';
import { CommandCenter } from '../entities/command-center.entity';
import { DashboardStats } from '../entities/dashboard.entity';
import { DataAnalyst } from '../entities/data-analyst.entity';
import { Log } from '../entities/log.entity';
import { Report } from '../entities/report.entity';
import { Schedule } from '../entities/schedule.entity';
import { Workflow } from '../entities/workflow.entity';

export interface IAiAnalyticsRepository {
  getAlerts(): Promise<Alert[]>;
  getDashboardStats(): Promise<DashboardStats>;
  getInsights(): Promise<DataAnalyst[]>;
  getLogs(): Promise<Log[]>;
  getReports(): Promise<Report[]>;
  getSchedules(): Promise<Schedule[]>;
  getTasks(): Promise<{ id: string; name: string; status: string }[]>;
  getWorkflows(): Promise<Workflow[]>;
}
