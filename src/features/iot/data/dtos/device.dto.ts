export interface DeviceResponseDto {
  id: string;
  name: string;
  type: string;
  status: string;
  locationId?: string;
  locationName?: string;
  ip?: string;
  mac?: string;
  firmware?: string;
  lastSeen?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SensorDataResponseDto {
  id: string;
  deviceId: string;
  type: string;
  value: number;
  unit: string;
  timestamp: string;
}

export interface GpsDataResponseDto {
  id: string;
  deviceId: string;
  latitude: number;
  longitude: number;
  altitude?: number;
  speed?: number;
  timestamp: string;
}
