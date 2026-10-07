export interface PaymentResponseDto {
  id: string;
  paymentNumber: string;
  invoiceId?: string;
  customerId: string;
  customerName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  status: string;
  reference?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItemDto {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceResponseDto {
  id: string;
  invoiceNumber: string;
  paymentId: string;
  customerId: string;
  customerName: string;
  items: InvoiceItemDto[];
  subtotal: number;
  vat: number;
  total: number;
  status: string;
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
}

export interface ListPaymentsResponseDto {
  data: PaymentResponseDto[];
  total: number;
}

export interface CreatePaymentRequestDto {
  paymentNumber: string;
  invoiceId?: string;
  customerId: string;
  customerName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  reference?: string;
  notes?: string;
}
