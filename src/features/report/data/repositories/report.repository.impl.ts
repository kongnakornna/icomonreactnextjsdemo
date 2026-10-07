import {
  AlarmLog,
  DeviceReport,
  LogsControl,
  ScheduleLog,
} from '../../domain/entities/report.entity';
import { IReportRepository } from '../../domain/repositories/report.repository';
import { ReportApiDatasource } from '../datasources/report.api.datasource';

export class ReportRepositoryImpl implements IReportRepository {
  constructor(private readonly datasource: ReportApiDatasource) {}

  async getAlarmLogs(params?: {
    deviceId?: string;
    from?: string;
    to?: string;
  }): Promise<AlarmLog[]> {
    return this.datasource.getAlarmLogs(params) as unknown as AlarmLog[];
  }

  async getDeviceReport(
    deviceId: string,
    params?: { from?: string; to?: string }
  ): Promise<DeviceReport> {
    return this.datasource.getDeviceReport(deviceId, params);
  }

  async getLogsControl(params?: {
    userId?: string;
    from?: string;
    to?: string;
  }): Promise<LogsControl[]> {
    return this.datasource.getLogsControl(params);
  }

  async getScheduleLogs(params?: { from?: string; to?: string }): Promise<ScheduleLog[]> {
    return this.datasource.getScheduleLogs(params);
  }
}
