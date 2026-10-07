'use client';

import { useEffect, useState } from 'react';
import { BatchJob } from '../../domain/entities/batch-job.entity';
import { ListBatchJobsUseCase } from '../../domain/use-cases/list-batch-jobs.use-case';
import { TriggerBatchJobUseCase } from '../../domain/use-cases/trigger-batch-job.use-case';
import { BatchApiDataSource } from '../../data/datasources/batch.api.datasource';
import { BatchRepositoryImpl } from '../../data/repositories/batch.repository.impl';
import { useToast } from '@/app/_components/shared/toast-provider';

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  running: 'bg-blue-100 text-blue-800',
};

export default function BatchListPage() {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState<BatchJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const datasource = new BatchApiDataSource();
      const repo = new BatchRepositoryImpl(datasource);
      const useCase = new ListBatchJobsUseCase(repo);
      const result = await useCase.execute();
      setJobs(result);
    } catch (err) {
      setError('Failed to load batch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleTrigger = async (id: string) => {
    try {
      const datasource = new BatchApiDataSource();
      const repo = new BatchRepositoryImpl(datasource);
      const useCase = new TriggerBatchJobUseCase(repo);
      await useCase.execute(id);
      showToast('Job triggered successfully', 'success');
      loadJobs();
    } catch (err) {
      showToast('Failed to trigger job', 'error');
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
        <h1 className="text-2xl font-bold">Batch Jobs</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cron
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Run
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Run
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{job.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{job.cronExpression}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[job.status]}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.lastRun ? new Date(job.lastRun).toLocaleString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.nextRun ? new Date(job.nextRun).toLocaleString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleTrigger(job.id)}
                    disabled={job.status === 'running'}
                    className="text-blue-500 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Trigger
                  </button>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  No batch jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
