export interface QuotationItemDto {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface QuotationResponseDto {
  id: string;
  quotationNumber: string;
  customerId: string;
  customerName: string;
  subject: string;
  items: QuotationItemDto[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  status: string;
  validUntil: string;
  notes?: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListQuotationsResponseDto {
  data: QuotationResponseDto[];
  total: number;
}

export interface CreateQuotationRequestDto {
  quotationNumber: string;
  customerId: string;
  customerName: string;
  subject: string;
  items: QuotationItemDto[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  validUntil: string;
  notes?: string;
  createdBy: string;
}
