import { IChatbotRepository } from '../../domain/repositories/chatbot.repository';
import { ChatMessage } from '../../domain/entities/chat-message.entity';
import { ChatbotApiDatasource } from '../datasources/chatbot.api.datasource';

export class ChatbotRepositoryImpl implements IChatbotRepository {
  private datasource: ChatbotApiDatasource;

  constructor() {
    this.datasource = new ChatbotApiDatasource();
  }

  async sendMessage(message: string, model?: string): Promise<ChatMessage> {
    return this.datasource.sendMessage(message, model);
  }

  async getContext(): Promise<ChatMessage[]> {
    return this.datasource.getContext();
  }

  async getModels(): Promise<{ id: string; name: string }[]> {
    return this.datasource.getModels();
  }

  async executeAction(action: string, params: Record<string, unknown>): Promise<unknown> {
    return this.datasource.executeAction(action, params);
  }
}
