'use client';

import { useEffect, useState } from 'react';
import { MonitoringDevice, DashboardModule, DASHBOARD_MODULES } from '../../domain/entities/monitoring-device.entity';
import { ListMonitoringDevicesUseCase } from '../../domain/use-cases/list-monitoring-devices.use-case';
import { MonitoringApiDataSource } from '../../data/datasources/monitoring.api.datasource';

interface MonitoringDashboardPageProps {
  module: DashboardModule;
}

export default function MonitoringDashboardPage({ module }: MonitoringDashboardPageProps) {
  const [devices, setDevices] = useState<MonitoringDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const moduleInfo = DASHBOARD_MODULES.find(m => m.key === module);

  useEffect(() => {
    loadDevices();
  }, [module]);

  const loadDevices = async () => {
    try {
      setLoading(true);
      setError(null);
      const datasource = new MonitoringApiDataSource();
      const result = await new ListMonitoringDevicesUseCase(datasource).execute(module);
      setDevices(result);
    } catch (err) {
      setError('Failed to load devices');
    } finally {
      setLoading(false);
    }
  };

  const onlineCount = devices.filter(d => d.status).length;
  const offlineCount = devices.filter(d => !d.status).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{moduleInfo?.label ?? module}</h1>
        <p className="text-gray-500 mt-1">{moduleInfo?.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">Total Devices</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{devices.length}</dd>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">Online</dt>
          <dd className="mt-1 text-3xl font-semibold text-green-600">{onlineCount}</dd>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">Offline</dt>
          <dd className="mt-1 text-3xl font-semibold text-red-600">{offlineCount}</dd>
        </div>
      </div>

      {loading && <div className="flex items-center justify-center h-32">Loading devices...</div>}
      {error && <div className="text-red-500 p-4">{error}</div>}

      {!loading && !error && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium">Devices</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{device.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.module}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${device.status ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={`text-sm ${device.status ? 'text-green-700' : 'text-red-700'}`}>
                        {device.status ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {devices.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No devices found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
        <h3 className="text-lg font-medium text-gray-700">Coming Soon</h3>
        <p className="text-gray-500 mt-2">Advanced analytics, real-time charts, and alert configuration are under development.</p>
      </div>
    </div>
  );
}
