'use client';

import { useEffect, useState } from 'react';
import { EmailLog } from '../../domain/entities/email.entity';
import { GetEmailLogsUseCase } from '../../domain/use-cases/get-email-logs.use-case';
import { EmailApiDataSource } from '../../data/datasources/email.api.datasource';
import { EmailRepositoryImpl } from '../../data/repositories/email.repository.impl';
import { useToast } from '@/app/_components/shared/toast-provider';

const statusColors: Record<string, string> = {
  sent: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  opened: 'bg-blue-100 text-blue-800',
};

export default function EmailLogsPage() {
  const { showToast } = useToast();
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadLogs();
  }, [statusFilter]);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const datasource = new EmailApiDataSource();
      const repo = new EmailRepositoryImpl(datasource);
      const useCase = new GetEmailLogsUseCase(repo);
      const result = await useCase.execute(statusFilter ? { status: statusFilter } : undefined);
      setLogs(result.data);
    } catch (err) {
      setError('Failed to load email logs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Email Logs</h1>
      </div>

      <div className="flex space-x-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="sent">Sent</option>
          <option value="failed">Failed</option>
          <option value="opened">Opened</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sent At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Error
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.to}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[log.status]}`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(log.sentAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-red-500 max-w-xs truncate">
                  {log.error || '-'}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No email logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
