'use client';

import { useEffect, useState } from 'react';
import { DashboardStats } from '../../domain/entities/dashboard.entity';
import { GetDashboardStatsUseCase } from '../../domain/use-cases/get-dashboard-stats.use-case';
import { AiAnalyticsRepositoryImpl } from '../../data/repositories/ai-analytics.repository.impl';

export default function AiAnalyticsDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const repository = new AiAnalyticsRepositoryImpl();
      const result = await new GetDashboardStatsUseCase(repository).execute();
      setStats(result);
    } catch (err) {
      console.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI Analytics Dashboard</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">Total Alerts</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.totalAlerts ?? 0}</dd>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">Active Alerts</dt>
          <dd className="mt-1 text-3xl font-semibold text-red-600">{stats?.activeAlerts ?? 0}</dd>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">Total Reports</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.totalReports ?? 0}</dd>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">Pending Tasks</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.pendingTasks ?? 0}</dd>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">System Health</dt>
          <dd className="mt-1 text-3xl font-semibold text-green-600">{stats?.systemHealth ?? 0}%</dd>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">AI Insights</dt>
          <dd className="mt-1 text-3xl font-semibold text-purple-600">{stats?.aiInsights ?? 0}</dd>
        </div>
      </div>
    </div>
  );
}
