'use client';

import { useEffect, useState } from 'react';
import { Hardware } from '../../domain/entities/settings.entity';
import { ListHardwareUseCase } from '../../domain/use-cases/hardware.use-cases';
import { SettingsApiDataSource } from '../../data/datasources/settings.api.datasource';
import { HardwareRepositoryImpl } from '../../data/repositories/hardware.repository.impl';

export default function HardwareListPage() {
  const [hardware, setHardware] = useState<Hardware[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHardware();
  }, []);

  const loadHardware = async () => {
    try {
      setLoading(true);
      const datasource = new SettingsApiDataSource();
      const repository = new HardwareRepositoryImpl(datasource);
      const useCase = new ListHardwareUseCase(repository);
      const result = await useCase.execute();
      setHardware(result.data);
    } catch (err) {
      console.error('Failed to load hardware');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hardware</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Add Hardware
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hardware.map((hw) => (
              <tr key={hw.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{hw.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{hw.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{hw.model}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
