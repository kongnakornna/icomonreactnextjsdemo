import { IEmailRepository } from '../repositories/email.repository';
import { EmailTemplate } from '../entities/email.entity';

export class CreateEmailTemplateUseCase {
  constructor(private repo: IEmailRepository) {}

  async execute(template: Partial<EmailTemplate>): Promise<EmailTemplate> {
    return this.repo.createTemplate(template);
  }
}
