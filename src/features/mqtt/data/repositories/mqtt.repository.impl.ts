import {
  BrokerConfig,
  DeployStatus,
  AvailableSensor,
  IMqttRepository,
} from '../../domain/repositories/mqtt.repository';
import { Flow } from '../../domain/entities/flow.entity';
import { MqttApiDatasource } from '../datasources/mqtt.api.datasource';

export class MqttRepositoryImpl implements IMqttRepository {
  constructor(private readonly datasource: MqttApiDatasource) {}

  async list(): Promise<Flow[]> {
    return this.datasource.list() as unknown as Flow[];
  }

  async getById(id: string): Promise<Flow | null> {
    return this.datasource.getById(id) as unknown as Flow | null;
  }

  async save(flow: Flow): Promise<Flow> {
    return this.datasource.save(flow as unknown as import('../dtos/mqtt.dto').FlowDto) as unknown as Flow;
  }

  async deploy(id: string): Promise<DeployStatus> {
    return this.datasource.deploy(id) as unknown as DeployStatus;
  }

  async delete(id: string): Promise<void> {
    return this.datasource.delete(id);
  }

  async getBrokerConfig(): Promise<BrokerConfig> {
    return this.datasource.getBrokerConfig() as unknown as BrokerConfig;
  }

  async getDeployStatus(id: string): Promise<DeployStatus> {
    return this.datasource.getDeployStatus(id) as unknown as DeployStatus;
  }

  async getAvailableSensors(): Promise<AvailableSensor[]> {
    return this.datasource.getAvailableSensors() as unknown as AvailableSensor[];
  }
}
