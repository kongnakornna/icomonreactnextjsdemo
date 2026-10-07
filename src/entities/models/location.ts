import { z } from 'zod';

export const locationSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Location = z.infer<typeof locationSchema>;

export const createLocationSchema = locationSchema
  .omit({ id: true, createdAt: true, updatedAt: true });

export type CreateLocation = z.infer<typeof createLocationSchema>;
