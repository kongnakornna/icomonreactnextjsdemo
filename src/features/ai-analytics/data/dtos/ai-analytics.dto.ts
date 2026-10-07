export interface AlertDto {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommandCenterDto {
  id: string;
  name: string;
  status: string;
  activeAlerts: number;
  pendingTasks: number;
  lastUpdated: string;
}

export interface DashboardStatsDto {
  totalAlerts: number;
  activeAlerts: number;
  totalReports: number;
  pendingTasks: number;
  systemHealth: number;
  aiInsights: number;
}

export interface DataAnalystDto {
  id: string;
  query: string;
  result: string;
  visualization: string;
  createdAt: string;
}

export interface LogDto {
  id: string;
  level: string;
  message: string;
  source: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

export interface ReportDto {
  id: string;
  title: string;
  type: string;
  status: string;
  createdAt: string;
  completedAt?: string;
}

export interface ScheduleDto {
  id: string;
  name: string;
  cronExpression: string;
  taskType: string;
  status: string;
  lastRun?: string;
  nextRun?: string;
}

export interface WorkflowDto {
  id: string;
  name: string;
  description: string;
  status: string;
  steps: { id: string; name: string; status: string }[];
  createdAt: string;
  updatedAt: string;
}
