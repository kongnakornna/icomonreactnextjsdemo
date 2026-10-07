'use client';

import { useEffect, useState } from 'react';
import { Schedule } from '../../domain/entities/settings.entity';
import { ListSchedulesUseCase } from '../../domain/use-cases/schedule.use-cases';
import { SettingsApiDataSource } from '../../data/datasources/settings.api.datasource';
import { ScheduleRepositoryImpl } from '../../data/repositories/schedule.repository.impl';

export default function ScheduleListPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      setLoading(true);
      const datasource = new SettingsApiDataSource();
      const repository = new ScheduleRepositoryImpl(datasource);
      const useCase = new ListSchedulesUseCase(repository);
      const result = await useCase.execute();
      setSchedules(result.data);
    } catch (err) {
      console.error('Failed to load schedules');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Schedules</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Add Schedule
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cron</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schedules.map((sch) => (
              <tr key={sch.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{sch.name}</td>
                <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{sch.cronExpression}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${sch.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {sch.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
