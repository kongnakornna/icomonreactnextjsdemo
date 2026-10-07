import { IEmailRepository } from '../repositories/email.repository';
import { EmailLog } from '../entities/email.entity';

export class GetEmailLogsUseCase {
  constructor(private repo: IEmailRepository) {}

  async execute(params?: { status?: string; page?: number; pageSize?: number }): Promise<{ data: EmailLog[]; total: number }> {
    return this.repo.getLogs(params);
  }
}
