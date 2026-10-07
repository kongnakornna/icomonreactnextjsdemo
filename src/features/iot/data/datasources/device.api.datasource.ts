import { DeviceResponseDto, SensorDataResponseDto, GpsDataResponseDto } from '../dtos/device.dto';

export class DeviceApiDataSource {
  private baseUrl = '/api/iot/devices';

  async list(params?: { search?: string; page?: number; pageSize?: number; type?: string; status?: string }): Promise<{ data: DeviceResponseDto[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
    if (params?.type) searchParams.set('type', params.type);
    if (params?.status) searchParams.set('status', params.status);

    const response = await fetch(`${this.baseUrl}?${searchParams.toString()}`);
    return response.json();
  }

  async getById(id: string): Promise<DeviceResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  async create(device: Partial<DeviceResponseDto>): Promise<DeviceResponseDto> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(device),
    });
    return response.json();
  }

  async update(id: string, device: Partial<DeviceResponseDto>): Promise<DeviceResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(device),
    });
    return response.json();
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, { method: 'DELETE' });
  }

  async getSensorData(deviceId: string, params?: { startDate?: string; endDate?: string }): Promise<SensorDataResponseDto[]> {
    const searchParams = new URLSearchParams();
    if (params?.startDate) searchParams.set('startDate', params.startDate);
    if (params?.endDate) searchParams.set('endDate', params.endDate);

    const response = await fetch(`${this.baseUrl}/${deviceId}/sensor-data?${searchParams.toString()}`);
    return response.json();
  }

  async getGpsData(deviceId: string): Promise<GpsDataResponseDto[]> {
    const response = await fetch(`${this.baseUrl}/${deviceId}/gps-data`);
    return response.json();
  }
}
