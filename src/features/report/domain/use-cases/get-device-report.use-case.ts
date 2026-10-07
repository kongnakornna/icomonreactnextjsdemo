import { DeviceReport } from '../entities/report.entity';
import { IReportRepository } from '../repositories/report.repository';

export class GetDeviceReportUseCase {
  constructor(private readonly repository: IReportRepository) {}

  async execute(deviceId: string, params?: { from?: string; to?: string }): Promise<DeviceReport> {
    return this.repository.getDeviceReport(deviceId, params);
  }
}
