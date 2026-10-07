export interface DashboardStatsResponseDto {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

export interface RevenueDataResponseDto {
  month: string;
  revenue: number;
  orders: number;
}

export interface JobStatusSummaryResponseDto {
  pending: number;
  inProgress: number;
  completed: number;
  failed: number;
}
