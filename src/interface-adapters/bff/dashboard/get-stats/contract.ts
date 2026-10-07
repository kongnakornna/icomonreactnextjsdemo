import type { DashboardStats, RevenueData, JobStatusSummary } from '@/src/entities/models/dashboard';
import type { UnknownError } from '@/src/entities/errors/common';

export type GetDashboardStatsBffOutput =
  | { status: 'success'; data: DashboardStats }
  | { status: 'failure'; code: 'unknown_error' };

export type IGetDashboardStatsBffController = () => Promise<GetDashboardStatsBffOutput>;
export type IGetDashboardStatsBffPresenter = (output: DashboardStats | UnknownError) => Promise<GetDashboardStatsBffOutput>;

export type IGetDashboardStatsBffUseCase = () => Promise<GetDashboardStatsBffOutput>;

export type GetRevenueChartBffOutput =
  | { status: 'success'; data: RevenueData[] }
  | { status: 'failure'; code: 'unknown_error' };

export type IGetRevenueChartBffController = () => Promise<GetRevenueChartBffOutput>;
export type IGetRevenueChartBffPresenter = (output: RevenueData[] | UnknownError) => Promise<GetRevenueChartBffOutput>;

export type IGetRevenueChartBffUseCase = (input: { months?: number }) => Promise<GetRevenueChartBffOutput>;
