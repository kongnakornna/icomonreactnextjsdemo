import { IEmailRepository } from '../repositories/email.repository';

export class SendEmailUseCase {
  constructor(private repo: IEmailRepository) {}

  async execute(to: string, subject: string, body: string): Promise<void> {
    return this.repo.send(to, subject, body);
  }
}
