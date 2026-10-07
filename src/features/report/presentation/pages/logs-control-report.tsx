'use client';

import { useEffect, useState } from 'react';
import { LogsControl } from '../../domain/entities/report.entity';
import { ReportRepositoryImpl } from '../../data/repositories/report.repository.impl';
import { ReportApiDatasource } from '../../data/datasources/report.api.datasource';
import { GetLogsControlUseCase } from '../../domain/use-cases/get-logs-control.use-case';

const datasource = new ReportApiDatasource();
const repository = new ReportRepositoryImpl(datasource);
const getLogsControlUseCase = new GetLogsControlUseCase(repository);

export default function LogsControlReport() {
  const [logs, setLogs] = useState<LogsControl[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLogsControlUseCase
      .execute()
      .then(setLogs)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading logs...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Logs Control Report</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Action</th>
            <th className="text-left p-2">User</th>
            <th className="text-left p-2">Details</th>
            <th className="text-left p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{log.action}</td>
              <td className="p-2">{log.userId}</td>
              <td className="p-2">{log.details}</td>
              <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
