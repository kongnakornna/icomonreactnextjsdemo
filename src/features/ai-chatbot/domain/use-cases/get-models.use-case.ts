import { IChatbotRepository } from '../repositories/chatbot.repository';

export class GetModelsUseCase {
  constructor(private repository: IChatbotRepository) {}

  async execute(): Promise<{ id: string; name: string }[]> {
    return this.repository.getModels();
  }
}
