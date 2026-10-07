import { IMonitoringRepository } from '../repositories/monitoring.repository';
import { MonitoringDevice, DashboardModule } from '../entities/monitoring-device.entity';

export class ListMonitoringDevicesUseCase {
  constructor(private repo: IMonitoringRepository) {}

  async execute(module: DashboardModule): Promise<MonitoringDevice[]> {
    return this.repo.listByModule(module);
  }
}
