'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Device } from '../../domain/entities/device.entity';
import { GetDeviceUseCase } from '../../domain/use-cases/get-device.use-case';
import { DeviceApiDataSource } from '../../data/datasources/device.api.datasource';
import { DeviceRepositoryImpl } from '../../data/repositories/device.repository.impl';

export default function DeviceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDevice();
  }, [id]);

  const loadDevice = async () => {
    try {
      setLoading(true);
      const datasource = new DeviceApiDataSource();
      const repository = new DeviceRepositoryImpl(datasource);
      const useCase = new GetDeviceUseCase(repository);
      const result = await useCase.execute(id);
      setDevice(result ?? null);
    } catch (err) {
      setError('Failed to load device');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!device) return <div className="text-red-500">Device not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{device.name}</h1>
        <button
          onClick={() => router.push(`/iot/devices/${id}/edit`)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Edit
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <span className={`px-2 py-1 text-xs rounded-full ${
                device.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {device.status}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Type</dt>
            <dd className="mt-1 text-sm text-gray-900">{device.type}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-sm text-gray-900">{device.locationName ?? 'N/A'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">IP Address</dt>
            <dd className="mt-1 text-sm text-gray-900">{device.ip ?? 'N/A'}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
