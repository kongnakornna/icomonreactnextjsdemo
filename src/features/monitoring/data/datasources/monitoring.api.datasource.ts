import { MonitoringDeviceResponseDto } from '../dtos/monitoring.dto';
import { DashboardModule } from '../../domain/entities/monitoring-device.entity';

export class MonitoringApiDataSource {
  private baseUrl = '/api/iot/devices';

  async listByModule(module: DashboardModule): Promise<MonitoringDeviceResponseDto[]> {
    const response = await fetch(`${this.baseUrl}?module=${module}`);
    return response.json();
  }
}
