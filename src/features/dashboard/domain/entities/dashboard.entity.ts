export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
}

export interface JobStatusSummary {
  pending: number;
  inProgress: number;
  completed: number;
  failed: number;
}
