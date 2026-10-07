import { AlarmLog } from '../entities/report.entity';
import { IReportRepository } from '../repositories/report.repository';

export class GetAlarmLogsUseCase {
  constructor(private readonly repository: IReportRepository) {}

  async execute(params?: { deviceId?: string; from?: string; to?: string }): Promise<AlarmLog[]> {
    return this.repository.getAlarmLogs(params);
  }
}
