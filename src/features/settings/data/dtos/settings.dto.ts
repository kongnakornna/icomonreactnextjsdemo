export interface LocationResponseDto {
  id: string;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HardwareResponseDto {
  id: string;
  name: string;
  type: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  locationId?: string;
  locationName?: string;
  status: string;
  purchaseDate?: string;
  warrantyExpiry?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SensorResponseDto {
  id: string;
  name: string;
  type: string;
  unit: string;
  minRange?: number;
  maxRange?: number;
  deviceId?: string;
  deviceName?: string;
  locationId?: string;
  locationName?: string;
  status: string;
  lastCalibration?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleResponseDto {
  id: string;
  name: string;
  description?: string;
  cronExpression: string;
  deviceId?: string;
  deviceName?: string;
  action: string;
  parameters?: Record<string, unknown>;
  isActive: boolean;
  lastRun?: string;
  nextRun?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TokenResponseDto {
  id: string;
  name: string;
  token: string;
  permissions: string[];
  expiresAt?: string;
  lastUsed?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
