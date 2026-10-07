export type DeviceType = 'sensor' | 'actuator' | 'gateway' | 'controller';
export type DeviceStatus = 'online' | 'offline' | 'maintenance';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  locationId?: string;
  locationName?: string;
  ip?: string;
  mac?: string;
  firmware?: string;
  lastSeen?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SensorData {
  id: string;
  deviceId: string;
  type: string;
  value: number;
  unit: string;
  timestamp: Date;
}

export interface GpsData {
  id: string;
  deviceId: string;
  latitude: number;
  longitude: number;
  altitude?: number;
  speed?: number;
  timestamp: Date;
}
