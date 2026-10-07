import { z } from 'zod';

export const FlowNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  name: z.string(),
  x: z.number(),
  y: z.number(),
  config: z.record(z.unknown()).optional(),
});

export const FlowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  nodes: z.array(FlowNodeSchema),
  isActive: z.boolean(),
  deployedAt: z.string().datetime().nullable(),
});

export type FlowNode = z.infer<typeof FlowNodeSchema>;
export type Flow = z.infer<typeof FlowSchema>;
