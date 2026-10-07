export interface Location {
  id: string;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Hardware {
  id: string;
  name: string;
  type: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  locationId?: string;
  locationName?: string;
  status: 'active' | 'inactive' | 'maintenance';
  purchaseDate?: Date;
  warrantyExpiry?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sensor {
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
  status: 'active' | 'inactive' | 'calibrating';
  lastCalibration?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Schedule {
  id: string;
  name: string;
  description?: string;
  cronExpression: string;
  deviceId?: string;
  deviceName?: string;
  action: string;
  parameters?: Record<string, unknown>;
  isActive: boolean;
  lastRun?: Date;
  nextRun?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Token {
  id: string;
  name: string;
  token: string;
  permissions: string[];
  expiresAt?: Date;
  lastUsed?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
