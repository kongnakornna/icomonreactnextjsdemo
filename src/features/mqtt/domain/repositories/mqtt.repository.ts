import { Flow } from '../entities/flow.entity';

export interface BrokerConfig {
  host: string;
  port: number;
  clientId: string;
  connected: boolean;
}

export interface DeployStatus {
  flowId: string;
  status: 'pending' | 'deploying' | 'deployed' | 'failed';
  message?: string;
}

export interface AvailableSensor {
  id: string;
  name: string;
  type: string;
}

export interface IMqttRepository {
  list(): Promise<Flow[]>;
  getById(id: string): Promise<Flow | null>;
  save(flow: Flow): Promise<Flow>;
  deploy(id: string): Promise<DeployStatus>;
  delete(id: string): Promise<void>;
  getBrokerConfig(): Promise<BrokerConfig>;
  getDeployStatus(id: string): Promise<DeployStatus>;
  getAvailableSensors(): Promise<AvailableSensor[]>;
}
