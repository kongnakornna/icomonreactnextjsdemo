import { z } from 'zod';

export const toolDefinitionSchema = z.object({
  name: z.string(),
  description: z.string(),
  parameters: z.record(z.string()),
});

export type ToolDefinition = z.infer<typeof toolDefinitionSchema>;
