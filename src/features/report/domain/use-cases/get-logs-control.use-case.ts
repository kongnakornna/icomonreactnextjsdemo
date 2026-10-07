import { LogsControl } from '../entities/report.entity';
import { IReportRepository } from '../repositories/report.repository';

export class GetLogsControlUseCase {
  constructor(private readonly repository: IReportRepository) {}

  async execute(params?: { userId?: string; from?: string; to?: string }): Promise<LogsControl[]> {
    return this.repository.getLogsControl(params);
  }
}
