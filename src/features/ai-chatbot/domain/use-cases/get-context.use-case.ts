import { IChatbotRepository } from '../repositories/chatbot.repository';
import { ChatMessage } from '../entities/chat-message.entity';

export class GetContextUseCase {
  constructor(private repository: IChatbotRepository) {}

  async execute(): Promise<ChatMessage[]> {
    return this.repository.getContext();
  }
}
