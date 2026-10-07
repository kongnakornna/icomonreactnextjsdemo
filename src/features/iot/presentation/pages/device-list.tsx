'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Device } from '../../domain/entities/device.entity';
import { ListDevicesUseCase } from '../../domain/use-cases/list-devices.use-case';
import { DeviceApiDataSource } from '../../data/datasources/device.api.datasource';
import { DeviceRepositoryImpl } from '../../data/repositories/device.repository.impl';

export default function DeviceListPage() {
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
      setLoading(true);
      const datasource = new DeviceApiDataSource();
      const repository = new DeviceRepositoryImpl(datasource);
      const useCase = new ListDevicesUseCase(repository);
      const result = await useCase.execute({});
      setDevices(result.data);
    } catch (err) {
      setError('Failed to load devices');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">IoT Devices</h1>
        <button
          onClick={() => router.push('/iot/devices/create')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Device
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-white overflow-hidden shadow rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => router.push(`/iot/devices/${device.id}`)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{device.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                device.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {device.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{device.type}</p>
            <p className="mt-1 text-sm text-gray-500">Location: {device.locationName ?? 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
