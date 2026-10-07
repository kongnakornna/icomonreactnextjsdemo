export interface POItemDto {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PurchaseOrderResponseDto {
  id: string;
  poNumber: string;
  quotationId?: string;
  supplierName: string;
  items: POItemDto[];
  subtotal: number;
  vat: number;
  total: number;
  status: string;
  expectedDelivery?: string;
  notes?: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListPurchaseOrdersResponseDto {
  data: PurchaseOrderResponseDto[];
  total: number;
}

export interface CreatePurchaseOrderRequestDto {
  poNumber: string;
  quotationId?: string;
  supplierName: string;
  items: POItemDto[];
  subtotal: number;
  vat: number;
  total: number;
  expectedDelivery?: string;
  notes?: string;
  createdBy: string;
}
