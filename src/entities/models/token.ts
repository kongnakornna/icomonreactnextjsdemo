import { z } from 'zod';

export const tokenSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  token: z.string(),
  permissions: z.array(z.string()).default([]),
  expiresAt: z.date().optional(),
  lastUsed: z.date().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Token = z.infer<typeof tokenSchema>;

export const createTokenSchema = tokenSchema
  .omit({ id: true, token: true, lastUsed: true, createdAt: true, updatedAt: true });

export type CreateToken = z.infer<typeof createTokenSchema>;
