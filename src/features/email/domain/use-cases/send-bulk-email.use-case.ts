import { IEmailRepository } from '../repositories/email.repository';

export class SendBulkEmailUseCase {
  constructor(private repo: IEmailRepository) {}

  async execute(recipients: string[], subject: string, body: string): Promise<void> {
    return this.repo.sendBulk(recipients, subject, body);
  }
}
