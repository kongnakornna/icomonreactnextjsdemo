import { z } from 'zod';

export const ReportSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['alarm', 'device', 'logs_control', 'schedule']),
  parameters: z.record(z.unknown()),
  generatedAt: z.string().datetime(),
  fileUrl: z.string().url().nullable(),
});

export type Report = z.infer<typeof ReportSchema>;

export interface AlarmLog {
  id: string;
  deviceId: string;
  deviceName: string;
  alarmType: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

export interface DeviceReport {
  deviceId: string;
  deviceName: string;
  status: string;
  readings: { metric: string; value: number; unit: string }[];
  period: { from: string; to: string };
}

export interface LogsControl {
  id: string;
  action: string;
  userId: string;
  details: string;
  timestamp: string;
}

export interface ScheduleLog {
  id: string;
  scheduleName: string;
  status: string;
  executedAt: string;
  duration: number;
}
