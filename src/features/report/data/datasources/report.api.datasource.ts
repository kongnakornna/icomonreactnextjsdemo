import {
  AlarmLogDto,
  DeviceReportDto,
  LogsControlDto,
  ScheduleLogDto,
} from '../dtos/report.dto';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export class ReportApiDatasource {
  async getAlarmLogs(params?: {
    deviceId?: string;
    from?: string;
    to?: string;
  }): Promise<AlarmLogDto[]> {
    const searchParams = new URLSearchParams();
    if (params?.deviceId) searchParams.set('deviceId', params.deviceId);
    if (params?.from) searchParams.set('from', params.from);
    if (params?.to) searchParams.set('to', params.to);
    const query = searchParams.toString();
    const response = await fetch(`${API_BASE}/reports/alarm-logs${query ? `?${query}` : ''}`);
    if (!response.ok) throw new Error('Failed to fetch alarm logs');
    return response.json();
  }

  async getDeviceReport(
    deviceId: string,
    params?: { from?: string; to?: string }
  ): Promise<DeviceReportDto> {
    const searchParams = new URLSearchParams();
    if (params?.from) searchParams.set('from', params.from);
    if (params?.to) searchParams.set('to', params.to);
    const query = searchParams.toString();
    const response = await fetch(
      `${API_BASE}/reports/device/${deviceId}${query ? `?${query}` : ''}`
    );
    if (!response.ok) throw new Error('Failed to fetch device report');
    return response.json();
  }

  async getLogsControl(params?: {
    userId?: string;
    from?: string;
    to?: string;
  }): Promise<LogsControlDto[]> {
    const searchParams = new URLSearchParams();
    if (params?.userId) searchParams.set('userId', params.userId);
    if (params?.from) searchParams.set('from', params.from);
    if (params?.to) searchParams.set('to', params.to);
    const query = searchParams.toString();
    const response = await fetch(`${API_BASE}/reports/logs-control${query ? `?${query}` : ''}`);
    if (!response.ok) throw new Error('Failed to fetch logs control');
    return response.json();
  }

  async getScheduleLogs(params?: { from?: string; to?: string }): Promise<ScheduleLogDto[]> {
    const searchParams = new URLSearchParams();
    if (params?.from) searchParams.set('from', params.from);
    if (params?.to) searchParams.set('to', params.to);
    const query = searchParams.toString();
    const response = await fetch(`${API_BASE}/reports/schedule-logs${query ? `?${query}` : ''}`);
    if (!response.ok) throw new Error('Failed to fetch schedule logs');
    return response.json();
  }
}
