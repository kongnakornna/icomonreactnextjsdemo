import { z } from 'zod';

export const deviceSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: z.enum(['sensor', 'actuator', 'gateway', 'controller']),
  status: z.enum(['online', 'offline', 'maintenance']),
  locationId: z.string().optional(),
  locationName: z.string().optional(),
  ip: z.string().optional(),
  mac: z.string().optional(),
  firmware: z.string().optional(),
  lastSeen: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Device = z.infer<typeof deviceSchema>;

export const createDeviceSchema = deviceSchema
  .omit({ id: true, createdAt: true, updatedAt: true, lastSeen: true });

export type CreateDevice = z.infer<typeof createDeviceSchema>;

export const sensorDataSchema = z.object({
  id: z.string(),
  deviceId: z.string(),
  type: z.string(),
  value: z.number(),
  unit: z.string(),
  timestamp: z.date(),
});

export type SensorData = z.infer<typeof sensorDataSchema>;

export const gpsDataSchema = z.object({
  id: z.string(),
  deviceId: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number().optional(),
  speed: z.number().optional(),
  timestamp: z.date(),
});

export type GpsData = z.infer<typeof gpsDataSchema>;
