import { IChatbotRepository } from '../../domain/repositories/chatbot.repository';
import { ChatMessage } from '../../domain/entities/chat-message.entity';

export class ChatbotApiDatasource implements IChatbotRepository {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseUrl = baseUrl;
  }

  async sendMessage(message: string, model?: string): Promise<ChatMessage> {
    const response = await fetch(`${this.baseUrl}/api/chatbot/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, model }),
    });
    if (!response.ok) throw new Error('Failed to send message');
    const data = await response.json();
    return { ...data, timestamp: new Date(data.timestamp) };
  }

  async getContext(): Promise<ChatMessage[]> {
    const response = await fetch(`${this.baseUrl}/api/chatbot/context`);
    if (!response.ok) throw new Error('Failed to fetch context');
    const data = await response.json();
    return data.map((item: any) => ({ ...item, timestamp: new Date(item.timestamp) }));
  }

  async getModels(): Promise<{ id: string; name: string }[]> {
    const response = await fetch(`${this.baseUrl}/api/chatbot/models`);
    if (!response.ok) throw new Error('Failed to fetch models');
    return response.json();
  }

  async executeAction(action: string, params: Record<string, unknown>): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}/api/chatbot/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, params }),
    });
    if (!response.ok) throw new Error('Failed to execute action');
    return response.json();
  }
}
