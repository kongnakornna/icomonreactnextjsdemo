export interface SendEmailRequestDto {
  to: string;
  subject: string;
  body: string;
}

export interface SendBulkEmailRequestDto {
  recipients: string[];
  subject: string;
  body: string;
}

export interface EmailLogResponseDto {
  id: string;
  to: string;
  subject: string;
  templateId?: string;
  status: 'sent' | 'failed' | 'opened';
  openedAt?: string;
  error?: string;
  sentAt: string;
}

export interface EmailTemplateResponseDto {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmailTemplateRequestDto {
  name: string;
  subject: string;
  body: string;
  variables: string[];
}
