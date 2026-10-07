export interface OrderItemResponseDto {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface WebOrderResponseDto {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItemResponseDto[];
  subtotal: number;
  shippingCost: number;
  vat: number;
  total: number;
  status: string;
  channel: string;
  shippingAddress: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedWebOrdersResponseDto {
  data: WebOrderResponseDto[];
  total: number;
  page: number;
  limit: number;
}
