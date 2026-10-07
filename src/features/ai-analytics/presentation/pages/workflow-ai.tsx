'use client';

import { useEffect, useState } from 'react';
import { Workflow } from '../../domain/entities/workflow.entity';
import { GetWorkflowsUseCase } from '../../domain/use-cases/get-workflows.use-case';
import { AiAnalyticsRepositoryImpl } from '../../data/repositories/ai-analytics.repository.impl';

export default function WorkflowAiPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    try {
      const repository = new AiAnalyticsRepositoryImpl();
      const result = await new GetWorkflowsUseCase(repository).execute();
      setWorkflows(result);
    } catch (err) {
      console.error('Failed to load workflows');
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Workflow AI</h1>
      <div className="space-y-4">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">{workflow.name}</h3>
                <p className="text-sm text-gray-500">{workflow.description}</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${statusColor(workflow.status)}`}>
                {workflow.status}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {workflow.steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`px-3 py-1 text-xs rounded-full ${
                    step.status === 'completed' ? 'bg-green-100 text-green-800' :
                    step.status === 'running' ? 'bg-blue-100 text-blue-800' :
                    step.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {step.name}
                  </div>
                  {index < workflow.steps.length - 1 && (
                    <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
