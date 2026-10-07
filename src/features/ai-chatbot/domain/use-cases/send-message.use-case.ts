import { IChatbotRepository } from '../repositories/chatbot.repository';
import { ChatMessage } from '../entities/chat-message.entity';

export class SendMessageUseCase {
  constructor(private repository: IChatbotRepository) {}

  async execute(message: string, model?: string): Promise<ChatMessage> {
    return this.repository.sendMessage(message, model);
  }
}
