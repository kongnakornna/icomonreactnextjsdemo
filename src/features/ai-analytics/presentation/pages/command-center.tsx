'use client';

import { useEffect, useState } from 'react';
import { CommandCenter } from '../../domain/entities/command-center.entity';
import { GetTasksUseCase } from '../../domain/use-cases/get-tasks.use-case';
import { AiAnalyticsRepositoryImpl } from '../../data/repositories/ai-analytics.repository.impl';

export default function CommandCenterPage() {
  const [tasks, setTasks] = useState<{ id: string; name: string; status: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const repository = new AiAnalyticsRepositoryImpl();
      const result = await new GetTasksUseCase(repository).execute();
      setTasks(result);
    } catch (err) {
      console.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Command Center</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Active Tasks</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm font-medium">{task.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'running' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Run Diagnostics</button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Generate Report</button>
            <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">Clear Alerts</button>
          </div>
        </div>
      </div>
    </div>
  );
}
