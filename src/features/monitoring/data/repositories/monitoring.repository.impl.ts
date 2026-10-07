import { IMonitoringRepository } from '../../domain/repositories/monitoring.repository';
import { MonitoringDevice, DashboardModule } from '../../domain/entities/monitoring-device.entity';
import { MonitoringApiDataSource } from '../datasources/monitoring.api.datasource';
import { MonitoringDeviceResponseDto } from '../dtos/monitoring.dto';

export class MonitoringRepositoryImpl implements IMonitoringRepository {
  constructor(private ds: MonitoringApiDataSource) {}

  async listByModule(module: DashboardModule): Promise<MonitoringDevice[]> {
    const dtos = await this.ds.listByModule(module);
    return dtos.map(d => this.toDeviceEntity(d));
  }

  private toDeviceEntity(d: MonitoringDeviceResponseDto): MonitoringDevice {
    return {
      id: d.id,
      name: d.name,
      module: d.module,
      status: d.status,
      location: d.location,
    };
  }
}
