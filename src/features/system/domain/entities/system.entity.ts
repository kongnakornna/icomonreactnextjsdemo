import { z } from 'zod';

export const apiMetricsSchema = z.object({
  totalRequests: z.number(),
  avgResponseTime: z.number(),
  errorRate: z.number(),
  p95ResponseTime: z.number(),
});

export const systemSchema = z.object({
  id: z.string(),
  status: z.enum(['healthy', 'degraded', 'down']),
  cpu: z.number(),
  memory: z.number(),
  uptime: z.number(),
  apiMetrics: apiMetricsSchema,
});

export type System = z.infer<typeof systemSchema>;
export type ApiMetrics = z.infer<typeof apiMetricsSchema>;
