'use client';

import { useEffect, useState } from 'react';
import { AlarmLog } from '../../domain/entities/report.entity';
import { ReportRepositoryImpl } from '../../data/repositories/report.repository.impl';
import { ReportApiDatasource } from '../../data/datasources/report.api.datasource';
import { GetAlarmLogsUseCase } from '../../domain/use-cases/get-alarm-logs.use-case';

const datasource = new ReportApiDatasource();
const repository = new ReportRepositoryImpl(datasource);
const getAlarmLogsUseCase = new GetAlarmLogsUseCase(repository);

export default function AlarmReport() {
  const [logs, setLogs] = useState<AlarmLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlarmLogsUseCase
      .execute()
      .then(setLogs)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading alarm logs...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Alarm Logs Report</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Device</th>
            <th className="text-left p-2">Alarm Type</th>
            <th className="text-left p-2">Message</th>
            <th className="text-left p-2">Severity</th>
            <th className="text-left p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{log.deviceName}</td>
              <td className="p-2">{log.alarmType}</td>
              <td className="p-2">{log.message}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    log.severity === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : log.severity === 'high'
                      ? 'bg-orange-100 text-orange-800'
                      : log.severity === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {log.severity}
                </span>
              </td>
              <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
