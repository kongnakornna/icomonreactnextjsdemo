'use client';

import { useEffect, useState } from 'react';
import { DashboardStats, RevenueData, JobStatusSummary } from '../../domain/entities/dashboard.entity';
import { GetDashboardStatsUseCase } from '../../domain/use-cases/get-dashboard-stats.use-case';
import { GetRevenueChartUseCase } from '../../domain/use-cases/get-revenue-chart.use-case';
import { GetJobStatusUseCase } from '../../domain/use-cases/get-job-status.use-case';
import { DashboardApiDataSource } from '../../data/datasources/dashboard.api.datasource';
import { DashboardRepositoryImpl } from '../../data/repositories/dashboard.repository.impl';

export default function MainDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenue, setRevenue] = useState<RevenueData[]>([]);
  const [jobStatus, setJobStatus] = useState<JobStatusSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const datasource = new DashboardApiDataSource();
      const repository = new DashboardRepositoryImpl(datasource);
      const [statsResult, revenueResult, jobResult] = await Promise.all([
        new GetDashboardStatsUseCase(repository).execute(),
        new GetRevenueChartUseCase(repository).execute(12),
        new GetJobStatusUseCase(repository).execute(),
      ]);
      setStats(statsResult);
      setRevenue(revenueResult);
      setJobStatus(jobResult);
    } catch (err) {
      console.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.totalCustomers ?? 0}</dd>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">Pending Orders</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.pendingOrders ?? 0}</dd>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">Completed Orders</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.completedOrders ?? 0}</dd>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">Revenue (MTD)</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">${stats?.monthlyRevenue ?? 0}</dd>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Revenue Trend</h2>
        <div className="flex items-end space-x-2 h-40">
          {revenue.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-500 rounded-t"
                style={{ height: `${(item.revenue / Math.max(...revenue.map(r => r.revenue), 1)) * 100}%` }}
              />
              <span className="text-xs text-gray-500 mt-1">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Job Status */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Job Status</h2>
        {jobStatus && (
          <div className="space-y-3">
            {[
              { label: 'Pending', count: jobStatus.pending, color: 'bg-yellow-500' },
              { label: 'In Progress', count: jobStatus.inProgress, color: 'bg-blue-500' },
              { label: 'Completed', count: jobStatus.completed, color: 'bg-green-500' },
              { label: 'Failed', count: jobStatus.failed, color: 'bg-red-500' },
            ].map((item) => {
              const maxCount = Math.max(jobStatus.pending, jobStatus.inProgress, jobStatus.completed, jobStatus.failed, 1);
              return (
                <div key={item.label} className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">{item.label}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${item.color}`}
                      style={{ width: `${(item.count / maxCount) * 100}%` }}
                    />
                  </div>
                  <div className="w-16 text-right text-sm font-medium">{item.count}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
