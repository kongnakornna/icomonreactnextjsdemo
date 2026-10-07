import { z } from 'zod';
import { InputParseError, UnknownError } from '@/src/entities/errors/common';
import type { DashboardStats, RevenueData, JobStatusSummary } from '@/src/entities/models/dashboard';
import type { IDashboardRepository } from '@/src/application/repositories/dashboard.repository.interface';

export type GetDashboardStatsInputData = Record<string, never>;

export type GetDashboardStatsOutputData = DashboardStats | UnknownError;

export type IGetDashboardStatsUseCase<VM> = () => Promise<VM>;

export type IGetDashboardStatsPresenter<VM> = (output: GetDashboardStatsOutputData) => Promise<VM>;

export const getDashboardStatsUseCase =
  <VM>(
    dashboardRepository: IDashboardRepository,
    presenter: IGetDashboardStatsPresenter<VM>
  ): IGetDashboardStatsUseCase<VM> =>
  async (): Promise<VM> => {
    try {
      const stats = await dashboardRepository.getStats();
      return presenter(stats);
    } catch (err) {
      return presenter(new UnknownError('Unknown error', { cause: err }));
    }
  };

export type GetRevenueChartDataInputData = { months?: number };

export type GetRevenueChartDataOutputData = RevenueData[] | UnknownError;

export type IGetRevenueChartDataUseCase<VM> = (input: GetRevenueChartDataInputData) => Promise<VM>;

export type IGetRevenueChartDataPresenter<VM> = (output: GetRevenueChartDataOutputData) => Promise<VM>;

export const getRevenueChartDataUseCase =
  <VM>(
    dashboardRepository: IDashboardRepository,
    presenter: IGetRevenueChartDataPresenter<VM>
  ): IGetRevenueChartDataUseCase<VM> =>
  async (input: GetRevenueChartDataInputData): Promise<VM> => {
    try {
      const data = await dashboardRepository.getRevenueChart(input.months);
      return presenter(data);
    } catch (err) {
      return presenter(new UnknownError('Unknown error', { cause: err }));
    }
  };
