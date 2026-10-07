import {
  AlarmLog,
  DeviceReport,
  LogsControl,
  ScheduleLog,
} from '../entities/report.entity';

export interface IReportRepository {
  getAlarmLogs(params?: { deviceId?: string; from?: string; to?: string }): Promise<AlarmLog[]>;
  getDeviceReport(deviceId: string, params?: { from?: string; to?: string }): Promise<DeviceReport>;
  getLogsControl(params?: { userId?: string; from?: string; to?: string }): Promise<LogsControl[]>;
  getScheduleLogs(params?: { from?: string; to?: string }): Promise<ScheduleLog[]>;
}
