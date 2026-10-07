import { WebSocketEvent } from '../domain/entities/websocket.entity';

type MessageHandler = (event: WebSocketEvent) => void;

export class WebSocketService {
  private ws: WebSocket | null = null;
  private url: string;
  private handlers: Map<string, MessageHandler[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(url: string = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001') {
    this.url = url;
  }

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const data: WebSocketEvent = JSON.parse(event.data);
        const handlers = this.handlers.get(data.event) || [];
        handlers.forEach((handler) => handler(data));
      } catch (err) {
        console.error('Failed to parse WebSocket message', err);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error', error);
    };
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(event: string, payload: Record<string, unknown>): void {
    if (this.ws?.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }
    this.ws.send(JSON.stringify({ event, payload, timestamp: new Date().toISOString() }));
  }

  onMessage(event: string, handler: MessageHandler): () => void {
    const handlers = this.handlers.get(event) || [];
    handlers.push(handler);
    this.handlers.set(event, handlers);

    return () => {
      const currentHandlers = this.handlers.get(event) || [];
      this.handlers.set(event, currentHandlers.filter((h) => h !== handler));
    };
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(), 1000 * this.reconnectAttempts);
    }
  }
}
