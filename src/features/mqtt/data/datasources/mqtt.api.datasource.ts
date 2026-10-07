import {
  FlowDto,
  BrokerConfigDto,
  DeployStatusDto,
  AvailableSensorDto,
} from '../dtos/mqtt.dto';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export class MqttApiDatasource {
  async list(): Promise<FlowDto[]> {
    const response = await fetch(`${API_BASE}/mqtt/flows`);
    if (!response.ok) throw new Error('Failed to fetch flows');
    return response.json();
  }

  async getById(id: string): Promise<FlowDto | null> {
    const response = await fetch(`${API_BASE}/mqtt/flows/${id}`);
    if (!response.ok) throw new Error('Failed to fetch flow');
    return response.json();
  }

  async save(flow: FlowDto): Promise<FlowDto> {
    const response = await fetch(`${API_BASE}/mqtt/flows`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flow),
    });
    if (!response.ok) throw new Error('Failed to save flow');
    return response.json();
  }

  async deploy(id: string): Promise<DeployStatusDto> {
    const response = await fetch(`${API_BASE}/mqtt/flows/${id}/deploy`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to deploy flow');
    return response.json();
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/mqtt/flows/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete flow');
  }

  async getBrokerConfig(): Promise<BrokerConfigDto> {
    const response = await fetch(`${API_BASE}/mqtt/broker/config`);
    if (!response.ok) throw new Error('Failed to fetch broker config');
    return response.json();
  }

  async getDeployStatus(id: string): Promise<DeployStatusDto> {
    const response = await fetch(`${API_BASE}/mqtt/flows/${id}/status`);
    if (!response.ok) throw new Error('Failed to fetch deploy status');
    return response.json();
  }

  async getAvailableSensors(): Promise<AvailableSensorDto[]> {
    const response = await fetch(`${API_BASE}/mqtt/sensors`);
    if (!response.ok) throw new Error('Failed to fetch available sensors');
    return response.json();
  }
}
