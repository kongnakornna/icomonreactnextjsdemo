import { ChatMessage } from '../entities/chat-message.entity';
import { ToolDefinition } from '../entities/tool-definition.entity';

export interface IChatbotRepository {
  sendMessage(message: string, model?: string): Promise<ChatMessage>;
  getContext(): Promise<ChatMessage[]>;
  getModels(): Promise<{ id: string; name: string }[]>;
  executeAction(action: string, params: Record<string, unknown>): Promise<unknown>;
}
