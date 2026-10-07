import { z } from 'zod';

export const websocketEventSchema = z.object({
  id: z.string(),
  url: z.string(),
  event: z.string(),
  payload: z.record(z.unknown()),
  timestamp: z.date(),
});

export type WebSocketEvent = z.infer<typeof websocketEventSchema>;
