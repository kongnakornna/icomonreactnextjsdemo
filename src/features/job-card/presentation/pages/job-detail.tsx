'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { JobCard, JobCardStatus } from '../../domain/entities/job-card.entity';
import { GetJobUseCase } from '../../domain/use-cases/get-job.use-case';
import { UpdateJobStatusUseCase } from '../../domain/use-cases/update-job-status.use-case';
import { AssignJobUseCase } from '../../domain/use-cases/assign-job.use-case';
import { JobCardApiDataSource } from '../../data/datasources/job-card.api.datasource';
import { JobCardRepositoryImpl } from '../../data/repositories/job-card.repository.impl';

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [job, setJob] = useState<JobCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      setLoading(true);
      const datasource = new JobCardApiDataSource();
      const repo = new JobCardRepositoryImpl(datasource);
      const useCase = new GetJobUseCase(repo);
      const result = await useCase.execute(id);
      setJob(result ?? null);
    } catch (err) {
      setError('Failed to load job');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: JobCardStatus) => {
    try {
      const datasource = new JobCardApiDataSource();
      const repo = new JobCardRepositoryImpl(datasource);
      const useCase = new UpdateJobStatusUseCase(repo);
      const updated = await useCase.execute(id, status);
      setJob(updated);
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const handleAssign = async () => {
    const assigneeId = prompt('Enter assignee ID:');
    if (!assigneeId) return;
    try {
      const datasource = new JobCardApiDataSource();
      const repo = new JobCardRepositoryImpl(datasource);
      const useCase = new AssignJobUseCase(repo);
      const updated = await useCase.execute(id, assigneeId);
      setJob(updated);
    } catch (err) {
      setError('Failed to assign job');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!job) return <div className="text-red-500">Job not found</div>;

  const statusFlow: JobCardStatus[] = ['todo', 'in_progress', 'review', 'done'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <div className="flex gap-3">
          <button
            onClick={handleAssign}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Assign
          </button>
          <button
            onClick={() => router.push(`/jobs/${id}/edit`)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <div className="flex gap-2">
                {statusFlow.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(s)}
                    className={`px-3 py-1 text-xs rounded-full ${
                      job.status === s ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Priority</dt>
            <dd className="mt-1">
              <span className={`px-2 py-1 text-xs rounded-full ${
                job.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                job.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                job.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {job.priority}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Assignee</dt>
            <dd className="mt-1 text-sm text-gray-900">{job.assigneeId ?? 'Unassigned'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Due Date</dt>
            <dd className="mt-1 text-sm text-gray-900">{job.dueDate ? new Date(job.dueDate).toLocaleDateString() : 'No due date'}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{job.description}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
