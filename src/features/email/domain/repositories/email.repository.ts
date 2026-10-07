import { EmailTemplate, EmailLog } from '../entities/email.entity';

export interface IEmailRepository {
  send(to: string, subject: string, body: string): Promise<void>;
  sendBulk(recipients: string[], subject: string, body: string): Promise<void>;
  getLogs(params?: { status?: string; page?: number; pageSize?: number }): Promise<{ data: EmailLog[]; total: number }>;
  getTemplates(): Promise<EmailTemplate[]>;
  createTemplate(template: Partial<EmailTemplate>): Promise<EmailTemplate>;
}
