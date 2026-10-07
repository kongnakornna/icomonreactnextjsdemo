export interface OrderItemDto {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderDto {
  id: string;
  orderNo: string;
  customerId: string;
  items: OrderItemDto[];
  totalAmount: number;
  status: string;
  createdAt: string;
}
