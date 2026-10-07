'use client';

import { useEffect, useState } from 'react';
import { DataAnalyst } from '../../domain/entities/data-analyst.entity';
import { GetInsightsUseCase } from '../../domain/use-cases/get-insights.use-case';
import { AiAnalyticsRepositoryImpl } from '../../data/repositories/ai-analytics.repository.impl';

export default function DataAnalystPage() {
  const [insights, setInsights] = useState<DataAnalyst[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const repository = new AiAnalyticsRepositoryImpl();
      const result = await new GetInsightsUseCase(repository).execute();
      setInsights(result);
    } catch (err) {
      console.error('Failed to load insights');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Data Analyst</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your query..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{insight.query}</span>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{insight.visualization}</span>
              </div>
              <p className="text-sm text-gray-600">{insight.result}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
