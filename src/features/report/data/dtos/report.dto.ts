export interface AlarmLogDto {
  id: string;
  deviceId: string;
  deviceName: string;
  alarmType: string;
  message: string;
  severity: string;
  timestamp: string;
}

export interface DeviceReportDto {
  deviceId: string;
  deviceName: string;
  status: string;
  readings: { metric: string; value: number; unit: string }[];
  period: { from: string; to: string };
}

export interface LogsControlDto {
  id: string;
  action: string;
  userId: string;
  details: string;
  timestamp: string;
}

export interface ScheduleLogDto {
  id: string;
  scheduleName: string;
  status: string;
  executedAt: string;
  duration: number;
}
