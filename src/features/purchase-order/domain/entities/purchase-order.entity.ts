export type POStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export interface POItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  quotationId?: string;
  supplierName: string;
  items: POItem[];
  subtotal: number;
  vat: number;
  total: number;
  status: POStatus;
  expectedDelivery?: Date;
  notes?: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}
