'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alarm } from '../../domain/entities/alarm.entity';
import { ListAlarmsUseCase } from '../../domain/use-cases/list-alarms.use-case';
import { AlarmApiDataSource } from '../../data/datasources/alarm.api.datasource';
import { AlarmRepositoryImpl } from '../../data/repositories/alarm.repository.impl';

export default function AlarmListPage() {
  const router = useRouter();
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAlarms();
  }, []);

  const loadAlarms = async () => {
    try {
      setLoading(true);
      const datasource = new AlarmApiDataSource();
      const repo = new AlarmRepositoryImpl(datasource);
      const useCase = new ListAlarmsUseCase(repo);
      const result = await useCase.execute({});
      setAlarms(result.data);
    } catch (err) {
      setError('Failed to load alarms');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Alarms</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {alarms.map((alarm) => (
              <tr
                key={alarm.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/alarms/${alarm.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alarm.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    alarm.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    alarm.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    alarm.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {alarm.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    alarm.status === 'active' ? 'bg-red-100 text-red-800' :
                    alarm.status === 'acknowledged' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alarm.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alarm.deviceId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(alarm.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
