'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Alarm } from '../../domain/entities/alarm.entity';
import { GetAlarmUseCase } from '../../domain/use-cases/get-alarm.use-case';
import { AcknowledgeAlarmUseCase } from '../../domain/use-cases/acknowledge-alarm.use-case';
import { AlarmApiDataSource } from '../../data/datasources/alarm.api.datasource';
import { AlarmRepositoryImpl } from '../../data/repositories/alarm.repository.impl';

export default function AlarmDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [alarm, setAlarm] = useState<Alarm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAlarm();
  }, [id]);

  const loadAlarm = async () => {
    try {
      setLoading(true);
      const datasource = new AlarmApiDataSource();
      const repo = new AlarmRepositoryImpl(datasource);
      const useCase = new GetAlarmUseCase(repo);
      const result = await useCase.execute(id);
      setAlarm(result ?? null);
    } catch (err) {
      setError('Failed to load alarm');
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledge = async () => {
    try {
      const datasource = new AlarmApiDataSource();
      const repo = new AlarmRepositoryImpl(datasource);
      const useCase = new AcknowledgeAlarmUseCase(repo);
      const updated = await useCase.execute(id);
      setAlarm(updated);
    } catch (err) {
      setError('Failed to acknowledge alarm');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!alarm) return <div className="text-red-500">Alarm not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{alarm.name}</h1>
        {alarm.status === 'active' && (
          <button
            onClick={handleAcknowledge}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Acknowledge
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Severity</dt>
            <dd className="mt-1">
              <span className={`px-2 py-1 text-xs rounded-full ${
                alarm.severity === 'critical' ? 'bg-red-100 text-red-800' :
                alarm.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                alarm.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {alarm.severity}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <span className={`px-2 py-1 text-xs rounded-full ${
                alarm.status === 'active' ? 'bg-red-100 text-red-800' :
                alarm.status === 'acknowledged' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {alarm.status}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Device ID</dt>
            <dd className="mt-1 text-sm text-gray-900">{alarm.deviceId}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="mt-1 text-sm text-gray-900">{new Date(alarm.createdAt).toLocaleString()}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Message</dt>
            <dd className="mt-1 text-sm text-gray-900">{alarm.message}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
