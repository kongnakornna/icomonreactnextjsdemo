'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { JobCardApiDataSource } from '../../data/datasources/job-card.api.datasource';
import { JobCardRepositoryImpl } from '../../data/repositories/job-card.repository.impl';
import { CreateJobUseCase } from '../../domain/use-cases/create-job.use-case';

export default function JobCreatePage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', assigneeId: '', dueDate: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const datasource = new JobCardApiDataSource();
      const repo = new JobCardRepositoryImpl(datasource);
      const useCase = new CreateJobUseCase(repo);
      await useCase.execute({
        title: form.title,
        description: form.description,
        priority: form.priority as 'low' | 'medium' | 'high' | 'urgent',
        assigneeId: form.assigneeId || null,
        dueDate: form.dueDate ? new Date(form.dueDate) : null,
      });
      router.push('/jobs');
    } catch (err) {
      setError('Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create Job Card</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Assignee ID</label>
            <input type="text" name="assigneeId" value={form.assigneeId} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50">
            {loading ? 'Creating...' : 'Create'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
