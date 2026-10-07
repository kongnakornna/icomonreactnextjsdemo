import { z } from 'zod';

export const hardwareSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: z.string(),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  locationId: z.string().optional(),
  locationName: z.string().optional(),
  status: z.enum(['active', 'inactive', 'maintenance']),
  purchaseDate: z.date().optional(),
  warrantyExpiry: z.date().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Hardware = z.infer<typeof hardwareSchema>;

export const createHardwareSchema = hardwareSchema
  .omit({ id: true, createdAt: true, updatedAt: true });

export type CreateHardware = z.infer<typeof createHardwareSchema>;
