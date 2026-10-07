import { IEmailRepository } from '../../domain/repositories/email.repository';
import { EmailTemplate, EmailLog } from '../../domain/entities/email.entity';
import { EmailApiDataSource } from '../datasources/email.api.datasource';
import { EmailLogResponseDto, EmailTemplateResponseDto, CreateEmailTemplateRequestDto } from '../dtos/email.dto';

export class EmailRepositoryImpl implements IEmailRepository {
  constructor(private ds: EmailApiDataSource) {}

  async send(to: string, subject: string, body: string): Promise<void> {
    await this.ds.send(to, subject, body);
  }

  async sendBulk(recipients: string[], subject: string, body: string): Promise<void> {
    await this.ds.sendBulk(recipients, subject, body);
  }

  async getLogs(params?: { status?: string; page?: number; pageSize?: number }): Promise<{ data: EmailLog[]; total: number }> {
    const result = await this.ds.getLogs(params);
    return {
      data: result.data.map((d) => this.toLogEntity(d)),
      total: result.total,
    };
  }

  async getTemplates(): Promise<EmailTemplate[]> {
    const dtos = await this.ds.getTemplates();
    return dtos.map((d) => this.toTemplateEntity(d));
  }

  async createTemplate(template: Partial<EmailTemplate>): Promise<EmailTemplate> {
    const dto = await this.ds.createTemplate(template as CreateEmailTemplateRequestDto);
    return this.toTemplateEntity(dto);
  }

  private toLogEntity(d: EmailLogResponseDto): EmailLog {
    return {
      id: d.id,
      to: d.to,
      subject: d.subject,
      templateId: d.templateId,
      status: d.status,
      openedAt: d.openedAt ? new Date(d.openedAt) : undefined,
      error: d.error,
      sentAt: new Date(d.sentAt),
    };
  }

  private toTemplateEntity(d: EmailTemplateResponseDto): EmailTemplate {
    return {
      id: d.id,
      name: d.name,
      subject: d.subject,
      body: d.body,
      variables: d.variables || [],
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }
}
