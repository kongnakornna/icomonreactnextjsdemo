'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SendEmailUseCase } from '../../domain/use-cases/send-email.use-case';
import { SendBulkEmailUseCase } from '../../domain/use-cases/send-bulk-email.use-case';
import { EmailApiDataSource } from '../../data/datasources/email.api.datasource';
import { EmailRepositoryImpl } from '../../data/repositories/email.repository.impl';
import { useToast } from '@/app/_components/shared/toast-provider';

export default function EmailComposePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'single' | 'bulk'>('single');
  const [formData, setFormData] = useState({
    to: '',
    recipients: '',
    subject: '',
    body: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const datasource = new EmailApiDataSource();
      const repo = new EmailRepositoryImpl(datasource);

      if (mode === 'single') {
        const useCase = new SendEmailUseCase(repo);
        await useCase.execute(formData.to, formData.subject, formData.body);
      } else {
        const recipients = formData.recipients.split(',').map((r) => r.trim()).filter(Boolean);
        const useCase = new SendBulkEmailUseCase(repo);
        await useCase.execute(recipients, formData.subject, formData.body);
      }

      showToast('Email sent successfully', 'success');
      router.push('/email/logs');
    } catch (err) {
      setError('Failed to send email');
      showToast('Failed to send email', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Compose Email</h1>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setMode('single')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === 'single' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Single
        </button>
        <button
          onClick={() => setMode('bulk')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === 'bulk' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Bulk
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        {mode === 'single' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">To</label>
            <input
              type="email"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">Recipients (comma-separated)</label>
            <input
              type="text"
              value={formData.recipients}
              onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="email1@example.com, email2@example.com"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Body</label>
          <textarea
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={10}
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.push('/email/logs')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
