'use client';

import { useEffect, useState } from 'react';
import { Log } from '../../domain/entities/log.entity';
import { GetLogsUseCase } from '../../domain/use-cases/get-logs.use-case';
import { AiAnalyticsRepositoryImpl } from '../../data/repositories/ai-analytics.repository.impl';

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const repository = new AiAnalyticsRepositoryImpl();
      const result = await new GetLogsUseCase(repository).execute();
      setLogs(result);
    } catch (err) {
      console.error('Failed to load logs');
    } finally {
      setLoading(false);
    }
  };

  const levelColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'debug': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Activity Log</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {logs.map((log) => (
            <div key={log.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${levelColor(log.level)}`}>
                    {log.level}
                  </span>
                  <span className="text-sm text-gray-900">{log.message}</span>
                </div>
                <span className="text-sm text-gray-500">{log.timestamp.toLocaleString()}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">Source: {log.source}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
