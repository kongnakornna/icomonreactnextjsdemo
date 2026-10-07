'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateBatchJobUseCase } from '../../domain/use-cases/create-batch-job.use-case';
import { BatchApiDataSource } from '../../data/datasources/batch.api.datasource';
import { BatchRepositoryImpl } from '../../data/repositories/batch.repository.impl';
import { useToast } from '@/app/_components/shared/toast-provider';

export default function BatchCreatePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cronExpression: '',
    status: 'active' as 'active' | 'inactive',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const datasource = new BatchApiDataSource();
      const repo = new BatchRepositoryImpl(datasource);
      const useCase = new CreateBatchJobUseCase(repo);
      await useCase.execute(formData);
      showToast('Batch job created successfully', 'success');
      router.push('/batch');
    } catch (err) {
      setError('Failed to create batch job');
      showToast('Failed to create batch job', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create Batch Job</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cron Expression</label>
          <input
            type="text"
            value={formData.cronExpression}
            onChange={(e) => setFormData({ ...formData, cronExpression: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 font-mono focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="0 */6 * * *"
            required
          />
          <p className="mt-1 text-xs text-gray-500">e.g. 0 */6 * * * (every 6 hours)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.push('/batch')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
