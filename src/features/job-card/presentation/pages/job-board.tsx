'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { JobCard, JobCardStatus } from '../../domain/entities/job-card.entity';
import { ListJobsUseCase } from '../../domain/use-cases/list-jobs.use-case';
import { UpdateJobStatusUseCase } from '../../domain/use-cases/update-job-status.use-case';
import { JobCardApiDataSource } from '../../data/datasources/job-card.api.datasource';
import { JobCardRepositoryImpl } from '../../data/repositories/job-card.repository.impl';

const columns: { status: JobCardStatus; label: string; color: string }[] = [
  { status: 'todo', label: 'To Do', color: 'bg-gray-100' },
  { status: 'in_progress', label: 'In Progress', color: 'bg-blue-50' },
  { status: 'review', label: 'Review', color: 'bg-yellow-50' },
  { status: 'done', label: 'Done', color: 'bg-green-50' },
];

export default function JobBoardPage() {
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

  const handleMoveJob = async (jobId: string, newStatus: JobCardStatus) => {
    try {
      const datasource = new JobCardApiDataSource();
      const repo = new JobCardRepositoryImpl(datasource);
      const useCase = new UpdateJobStatusUseCase(repo);
      const updated = await useCase.execute(jobId, newStatus);
      setJobs(prev => prev.map(j => j.id === jobId ? updated : j));
    } catch (err) {
      setError('Failed to update job status');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Board</h1>
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/jobs')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            List View
          </button>
          <button
            onClick={() => router.push('/jobs/create')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((col) => (
          <div key={col.status} className={`rounded-lg p-4 ${col.color}`}>
            <h2 className="font-semibold text-gray-700 mb-4">{col.label} ({jobs.filter(j => j.status === col.status).length})</h2>
            <div className="space-y-3">
              {jobs.filter(j => j.status === col.status).map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => router.push(`/jobs/${job.id}`)}
                >
                  <h3 className="text-sm font-medium">{job.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      job.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                      job.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      job.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {job.priority}
                    </span>
                    {job.dueDate && (
                      <span className="text-xs text-gray-500">{new Date(job.dueDate).toLocaleDateString()}</span>
                    )}
                  </div>
                  <div className="flex gap-1 mt-2">
                    {col.status !== 'todo' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); const prevStatus = columns[columns.findIndex(c => c.status === col.status) - 1]?.status; if (prevStatus) handleMoveJob(job.id, prevStatus); }}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        &larr;
                      </button>
                    )}
                    {col.status !== 'done' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); const nextStatus = columns[columns.findIndex(c => c.status === col.status) + 1]?.status; if (nextStatus) handleMoveJob(job.id, nextStatus); }}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        &rarr;
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
