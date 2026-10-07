'use client';

import { useEffect, useState } from 'react';
import { EmailTemplate } from '../../domain/entities/email.entity';
import { GetEmailLogsUseCase } from '../../domain/use-cases/get-email-logs.use-case';
import { EmailApiDataSource } from '../../data/datasources/email.api.datasource';
import { EmailRepositoryImpl } from '../../data/repositories/email.repository.impl';
import { useToast } from '@/app/_components/shared/toast-provider';

const statusColors: Record<string, string> = {
  sent: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  opened: 'bg-blue-100 text-blue-800',
};

export default function EmailTemplatesPage() {
  const { showToast } = useToast();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const datasource = new EmailApiDataSource();
      const repo = new EmailRepositoryImpl(datasource);
      const result = await repo.getTemplates();
      setTemplates(result.map((d) => ({
        id: d.id,
        name: d.name,
        subject: d.subject,
        body: d.body,
        variables: d.variables || [],
        createdAt: new Date(d.createdAt),
        updatedAt: new Date(d.updatedAt),
      })));
    } catch (err) {
      setError('Failed to load templates');
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
        <h1 className="text-2xl font-bold">Email Templates</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variables
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {templates.map((template) => (
              <tr key={template.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{template.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{template.subject}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex flex-wrap gap-1">
                    {template.variables.map((v) => (
                      <span key={v} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {`{{${v}}}`}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(template.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {templates.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No templates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
