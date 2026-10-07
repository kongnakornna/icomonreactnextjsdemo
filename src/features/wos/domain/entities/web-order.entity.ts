export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';

export type OrderChannel = 'facebook' | 'line' | 'shopee' | 'lazada' | 'website';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface WebOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  vat: number;
  total: number;
  status: OrderStatus;
  channel: OrderChannel;
  shippingAddress: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebOrderListParams {
  search?: string;
  status?: OrderStatus;
  channel?: OrderChannel;
  page?: number;
  limit?: number;
}

export interface PaginatedWebOrders {
  data: WebOrder[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateOrderItemInput {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateWebOrderInput {
  customerName: string;
  customerEmail: string;
  channel: OrderChannel;
  items: CreateOrderItemInput[];
  shippingAddress: string;
  notes?: string;
}
