import { MonitoringDevice, DashboardModule } from '../entities/monitoring-device.entity';

export interface IMonitoringRepository {
  listByModule(module: DashboardModule): Promise<MonitoringDevice[]>;
}
