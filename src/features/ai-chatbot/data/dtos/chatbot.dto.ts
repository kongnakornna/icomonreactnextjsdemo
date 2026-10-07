export interface SendMessageRequestDto {
  message: string;
  model?: string;
}

export interface ChatMessageResponseDto {
  id: string;
  role: string;
  content: string;
  model?: string;
  timestamp: string;
  toolCalls?: { id: string; name: string; arguments: string }[];
}

export interface ModelDto {
  id: string;
  name: string;
}

export interface ExecuteActionRequestDto {
  action: string;
  params: Record<string, unknown>;
}
