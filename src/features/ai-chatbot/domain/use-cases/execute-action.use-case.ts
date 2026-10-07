import { IChatbotRepository } from '../repositories/chatbot.repository';

export class ExecuteActionUseCase {
  constructor(private repository: IChatbotRepository) {}

  async execute(action: string, params: Record<string, unknown>): Promise<unknown> {
    return this.repository.executeAction(action, params);
  }
}
