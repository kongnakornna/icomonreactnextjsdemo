'use client';

import { useEffect, useState } from 'react';
import { Report } from '../../domain/entities/report.entity';
import { GetReportsUseCase } from '../../domain/use-cases/get-reports.use-case';
import { AiAnalyticsRepositoryImpl } from '../../data/repositories/ai-analytics.repository.impl';

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const repository = new AiAnalyticsRepositoryImpl();
      const result = await new GetReportsUseCase(repository).execute();
      setReports(result);
    } catch (err) {
      console.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reports</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Generate New Report</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">{report.title}</h3>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm text-gray-500">{report.type}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${statusColor(report.status)}`}>
                {report.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">Created: {report.createdAt.toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
