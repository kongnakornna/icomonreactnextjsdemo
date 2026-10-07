'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { JobCard } from '../../domain/entities/job-card.entity';
import { ListJobsUseCase } from '../../domain/use-cases/list-jobs.use-case';
import { JobCardApiDataSource } from '../../data/datasources/job-card.api.datasource';
import { JobCardRepositoryImpl } from '../../data/repositories/job-card.repository.impl';

export default function JobListPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const datasource = new JobCardApiDataSource();
      const repo = new JobCardRepositoryImpl(datasource);
      const useCase = new ListJobsUseCase(repo);
      const result = await useCase.execute({});
      setJobs(result.data);
    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Cards</h1>
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/jobs/board')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Board View
          </button>
          <button
            onClick={() => router.push('/jobs/create')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Job
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/jobs/${job.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    job.status === 'done' ? 'bg-green-100 text-green-800' :
                    job.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    job.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    job.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    job.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    job.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {job.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.assigneeId ?? 'Unassigned'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.dueDate ? new Date(job.dueDate).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
