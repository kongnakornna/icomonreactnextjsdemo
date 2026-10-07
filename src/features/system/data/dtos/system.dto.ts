export interface SystemDto {
  id: string;
  status: string;
  cpu: number;
  memory: number;
  uptime: number;
  apiMetrics: {
    totalRequests: number;
    avgResponseTime: number;
    errorRate: number;
    p95ResponseTime: number;
  };
}

export interface MetricsDto {
  cpu: number;
  memory: number;
  uptime: number;
}

export interface ApiMetricsDto {
  totalRequests: number;
  avgResponseTime: number;
  errorRate: number;
  p95ResponseTime: number;
}

export interface PingResponseDto {
  latency: number;
}
