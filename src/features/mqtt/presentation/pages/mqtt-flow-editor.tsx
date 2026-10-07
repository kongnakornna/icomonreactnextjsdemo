'use client';

import { useEffect, useState } from 'react';
import { Flow } from '../../domain/entities/flow.entity';
import { MqttRepositoryImpl } from '../../data/repositories/mqtt.repository.impl';
import { MqttApiDatasource } from '../../data/datasources/mqtt.api.datasource';
import { SaveFlowUseCase } from '../../domain/use-cases/save-flow.use-case';
import { DeployFlowUseCase } from '../../domain/use-cases/deploy-flow.use-case';

const datasource = new MqttApiDatasource();
const repository = new MqttRepositoryImpl(datasource);
const saveUseCase = new SaveFlowUseCase(repository);
const deployUseCase = new DeployFlowUseCase(repository);

export default function MqttFlowEditor() {
  const [flow, setFlow] = useState<Flow | null>(null);
  const [saving, setSaving] = useState(false);
  const [deploying, setDeploying] = useState(false);

  const handleSave = async () => {
    if (!flow) return;
    setSaving(true);
    try {
      await saveUseCase.execute(flow);
    } finally {
      setSaving(false);
    }
  };

  const handleDeploy = async () => {
    if (!flow) return;
    setDeploying(true);
    try {
      await deployUseCase.execute(flow.id);
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Flow Editor</h1>
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={handleDeploy}
          disabled={deploying}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {deploying ? 'Deploying...' : 'Deploy'}
        </button>
      </div>
      <div className="border rounded-lg min-h-[500px] bg-gray-50 flex items-center justify-center text-gray-400">
        Flow editor canvas area
      </div>
    </div>
  );
}
