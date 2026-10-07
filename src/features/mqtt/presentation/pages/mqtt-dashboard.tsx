'use client';

import { useEffect, useState } from 'react';
import { Flow } from '../../domain/entities/flow.entity';
import { MqttRepositoryImpl } from '../../data/repositories/mqtt.repository.impl';
import { MqttApiDatasource } from '../../data/datasources/mqtt.api.datasource';
import { ListFlowsUseCase } from '../../domain/use-cases/list-flows.use-case';
import { DeleteFlowUseCase } from '../../domain/use-cases/delete-flow.use-case';

const datasource = new MqttApiDatasource();
const repository = new MqttRepositoryImpl(datasource);
const listUseCase = new ListFlowsUseCase(repository);
const deleteUseCase = new DeleteFlowUseCase(repository);

export default function MqttDashboard() {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFlows = () => {
    listUseCase
      .execute()
      .then(setFlows)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFlows();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteUseCase.execute(id);
    loadFlows();
  };

  if (loading) return <div>Loading flows...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">MQTT / Node-RED Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flows.map((flow) => (
          <div key={flow.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold">{flow.name}</h3>
            <p className="text-sm text-gray-500">{flow.description}</p>
            <p className="text-sm text-gray-500">Nodes: {flow.nodes.length}</p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  flow.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {flow.isActive ? 'Active' : 'Inactive'}
              </span>
              {flow.deployedAt && (
                <span className="text-xs text-gray-400">
                  Deployed: {new Date(flow.deployedAt).toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                Edit
              </button>
              <button
                onClick={() => handleDelete(flow.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
