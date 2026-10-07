import { LocationResponseDto, HardwareResponseDto, SensorResponseDto, ScheduleResponseDto, TokenResponseDto } from '../dtos/settings.dto';

export class SettingsApiDataSource {
  private baseUrl = '/api/settings';

  async listLocations(params?: { search?: string; page?: number; pageSize?: number }): Promise<{ data: LocationResponseDto[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());

    const response = await fetch(`${this.baseUrl}/locations?${searchParams.toString()}`);
    return response.json();
  }

  async getLocationById(id: string): Promise<LocationResponseDto> {
    const response = await fetch(`${this.baseUrl}/locations/${id}`);
    return response.json();
  }

  async createLocation(location: Partial<LocationResponseDto>): Promise<LocationResponseDto> {
    const response = await fetch(`${this.baseUrl}/locations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(location),
    });
    return response.json();
  }

  async updateLocation(id: string, location: Partial<LocationResponseDto>): Promise<LocationResponseDto> {
    const response = await fetch(`${this.baseUrl}/locations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(location),
    });
    return response.json();
  }

  async deleteLocation(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/locations/${id}`, { method: 'DELETE' });
  }

  async listHardware(params?: { search?: string; page?: number; pageSize?: number; type?: string }): Promise<{ data: HardwareResponseDto[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
    if (params?.type) searchParams.set('type', params.type);

    const response = await fetch(`${this.baseUrl}/hardware?${searchParams.toString()}`);
    return response.json();
  }

  async getHardwareById(id: string): Promise<HardwareResponseDto> {
    const response = await fetch(`${this.baseUrl}/hardware/${id}`);
    return response.json();
  }

  async createHardware(hardware: Partial<HardwareResponseDto>): Promise<HardwareResponseDto> {
    const response = await fetch(`${this.baseUrl}/hardware`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hardware),
    });
    return response.json();
  }

  async updateHardware(id: string, hardware: Partial<HardwareResponseDto>): Promise<HardwareResponseDto> {
    const response = await fetch(`${this.baseUrl}/hardware/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hardware),
    });
    return response.json();
  }

  async deleteHardware(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/hardware/${id}`, { method: 'DELETE' });
  }

  async listSensors(params?: { search?: string; page?: number; pageSize?: number; type?: string }): Promise<{ data: SensorResponseDto[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
    if (params?.type) searchParams.set('type', params.type);

    const response = await fetch(`${this.baseUrl}/sensors?${searchParams.toString()}`);
    return response.json();
  }

  async getSensorById(id: string): Promise<SensorResponseDto> {
    const response = await fetch(`${this.baseUrl}/sensors/${id}`);
    return response.json();
  }

  async createSensor(sensor: Partial<SensorResponseDto>): Promise<SensorResponseDto> {
    const response = await fetch(`${this.baseUrl}/sensors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sensor),
    });
    return response.json();
  }

  async updateSensor(id: string, sensor: Partial<SensorResponseDto>): Promise<SensorResponseDto> {
    const response = await fetch(`${this.baseUrl}/sensors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sensor),
    });
    return response.json();
  }

  async deleteSensor(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/sensors/${id}`, { method: 'DELETE' });
  }

  async listSchedules(params?: { search?: string; page?: number; pageSize?: number; isActive?: boolean }): Promise<{ data: ScheduleResponseDto[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
    if (params?.isActive !== undefined) searchParams.set('isActive', params.isActive.toString());

    const response = await fetch(`${this.baseUrl}/schedules?${searchParams.toString()}`);
    return response.json();
  }

  async getScheduleById(id: string): Promise<ScheduleResponseDto> {
    const response = await fetch(`${this.baseUrl}/schedules/${id}`);
    return response.json();
  }

  async createSchedule(schedule: Partial<ScheduleResponseDto>): Promise<ScheduleResponseDto> {
    const response = await fetch(`${this.baseUrl}/schedules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule),
    });
    return response.json();
  }

  async updateSchedule(id: string, schedule: Partial<ScheduleResponseDto>): Promise<ScheduleResponseDto> {
    const response = await fetch(`${this.baseUrl}/schedules/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule),
    });
    return response.json();
  }

  async deleteSchedule(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/schedules/${id}`, { method: 'DELETE' });
  }

  async listTokens(params?: { search?: string; page?: number; pageSize?: number; isActive?: boolean }): Promise<{ data: TokenResponseDto[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
    if (params?.isActive !== undefined) searchParams.set('isActive', params.isActive.toString());

    const response = await fetch(`${this.baseUrl}/tokens?${searchParams.toString()}`);
    return response.json();
  }

  async getTokenById(id: string): Promise<TokenResponseDto> {
    const response = await fetch(`${this.baseUrl}/tokens/${id}`);
    return response.json();
  }

  async createToken(token: Partial<TokenResponseDto>): Promise<TokenResponseDto> {
    const response = await fetch(`${this.baseUrl}/tokens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(token),
    });
    return response.json();
  }

  async updateToken(id: string, token: Partial<TokenResponseDto>): Promise<TokenResponseDto> {
    const response = await fetch(`${this.baseUrl}/tokens/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(token),
    });
    return response.json();
  }

  async deleteToken(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/tokens/${id}`, { method: 'DELETE' });
  }
}
