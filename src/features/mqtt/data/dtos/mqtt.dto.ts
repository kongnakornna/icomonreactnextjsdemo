export interface FlowNodeDto {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  config?: Record<string, unknown>;
}

export interface FlowDto {
  id: string;
  name: string;
  description: string;
  nodes: FlowNodeDto[];
  isActive: boolean;
  deployedAt: string | null;
}

export interface BrokerConfigDto {
  host: string;
  port: number;
  clientId: string;
  connected: boolean;
}

export interface DeployStatusDto {
  flowId: string;
  status: string;
  message?: string;
}

export interface AvailableSensorDto {
  id: string;
  name: string;
  type: string;
}
