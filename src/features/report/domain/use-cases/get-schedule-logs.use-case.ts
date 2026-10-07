import { ScheduleLog } from '../entities/report.entity';
import { IReportRepository } from '../repositories/report.repository';

export class GetScheduleLogsUseCase {
  constructor(private readonly repository: IReportRepository) {}

  async execute(params?: { from?: string; to?: string }): Promise<ScheduleLog[]> {
    return this.repository.getScheduleLogs(params);
  }
}
