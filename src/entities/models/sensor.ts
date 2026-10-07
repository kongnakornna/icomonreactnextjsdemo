import { z } from 'zod';

export const sensorSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: z.string(),
  unit: z.string(),
  minRange: z.number().optional(),
  maxRange: z.number().optional(),
  deviceId: z.string().optional(),
  deviceName: z.string().optional(),
  locationId: z.string().optional(),
  locationName: z.string().optional(),
  status: z.enum(['active', 'inactive', 'calibrating']),
  lastCalibration: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Sensor = z.infer<typeof sensorSchema>;

export const createSensorSchema = sensorSchema
  .omit({ id: true, createdAt: true, updatedAt: true, lastCalibration: true });

export type CreateSensor = z.infer<typeof createSensorSchema>;
