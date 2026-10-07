'use client';

import { useEffect, useState } from 'react';
import { ScheduleLog } from '../../domain/entities/report.entity';
import { ReportRepositoryImpl } from '../../data/repositories/report.repository.impl';
import { ReportApiDatasource } from '../../data/datasources/report.api.datasource';
import { GetScheduleLogsUseCase } from '../../domain/use-cases/get-schedule-logs.use-case';

const datasource = new ReportApiDatasource();
const repository = new ReportRepositoryImpl(datasource);
const getScheduleLogsUseCase = new GetScheduleLogsUseCase(repository);

export default function ScheduleReport() {
  const [logs, setLogs] = useState<ScheduleLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScheduleLogsUseCase
      .execute()
      .then(setLogs)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading schedule logs...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Schedule Report</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Schedule</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Executed At</th>
            <th className="text-left p-2">Duration (ms)</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{log.scheduleName}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    log.status === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {log.status}
                </span>
              </td>
              <td className="p-2">{new Date(log.executedAt).toLocaleString()}</td>
              <td className="p-2">{log.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
