'use client';

import { useEffect, useState } from 'react';
import { DeviceReport as DeviceReportType } from '../../domain/entities/report.entity';
import { ReportRepositoryImpl } from '../../data/repositories/report.repository.impl';
import { ReportApiDatasource } from '../../data/datasources/report.api.datasource';
import { GetDeviceReportUseCase } from '../../domain/use-cases/get-device-report.use-case';

const datasource = new ReportApiDatasource();
const repository = new ReportRepositoryImpl(datasource);
const getDeviceReportUseCase = new GetDeviceReportUseCase(repository);

export default function DeviceReport() {
  const [report, setReport] = useState<DeviceReportType | null>(null);
  const [deviceId, setDeviceId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!deviceId) return;
    setLoading(true);
    try {
      const result = await getDeviceReportUseCase.execute(deviceId);
      setReport(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Device Report</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          placeholder="Enter device ID"
          className="border rounded px-3 py-2"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
      {report && (
        <div className="border rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p><strong>Device:</strong> {report.deviceName}</p>
            <p><strong>Status:</strong> {report.status}</p>
            <p><strong>From:</strong> {new Date(report.period.from).toLocaleString()}</p>
            <p><strong>To:</strong> {new Date(report.period.to).toLocaleString()}</p>
          </div>
          <h3 className="font-semibold mb-2">Readings</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Metric</th>
                <th className="text-left p-2">Value</th>
                <th className="text-left p-2">Unit</th>
              </tr>
            </thead>
            <tbody>
              {report.readings.map((reading, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{reading.metric}</td>
                  <td className="p-2">{reading.value}</td>
                  <td className="p-2">{reading.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
