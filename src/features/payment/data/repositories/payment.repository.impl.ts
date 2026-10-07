import { IPaymentRepository, ListPaymentsParams } from '../../domain/repositories/payment.repository';
import { Payment, Invoice } from '../../domain/entities/payment.entity';
import { PaymentApiDataSource } from '../datasources/payment.api.datasource';
import {
  PaymentResponseDto,
  InvoiceResponseDto,
  CreatePaymentRequestDto,
} from '../dtos/payment.dto';

export class PaymentRepositoryImpl implements IPaymentRepository {
  constructor(private ds: PaymentApiDataSource) {}

  async list(params?: ListPaymentsParams): Promise<{ data: Payment[]; total: number }> {
    const query: Record<string, string> = {};
    if (params) {
      if (params.page !== undefined) query.page = String(params.page);
      if (params.limit !== undefined) query.limit = String(params.limit);
      if (params.status) query.status = params.status;
      if (params.customerId) query.customerId = params.customerId;
      if (params.search) query.search = params.search;
    }
    const dto = await this.ds.list(query);
    return {
      data: dto.data.map(d => this.toPaymentEntity(d)),
      total: dto.total,
    };
  }

  async getById(id: string): Promise<Payment> {
    const dto = await this.ds.getById(id);
    return this.toPaymentEntity(dto);
  }

  async create(data: Omit<Payment, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
    const requestDto: CreatePaymentRequestDto = {
      paymentNumber: data.paymentNumber,
      invoiceId: data.invoiceId,
      customerId: data.customerId,
      customerName: data.customerName,
      amount: data.amount,
      paymentDate: data.paymentDate.toISOString(),
      paymentMethod: data.paymentMethod,
      reference: data.reference,
      notes: data.notes,
    };
    const dto = await this.ds.create(requestDto);
    return this.toPaymentEntity(dto);
  }

  async verify(id: string): Promise<Payment> {
    const dto = await this.ds.verify(id);
    return this.toPaymentEntity(dto);
  }

  async generateInvoice(id: string): Promise<Invoice> {
    const dto = await this.ds.generateInvoice(id);
    return this.toInvoiceEntity(dto);
  }

  private toPaymentEntity(d: PaymentResponseDto): Payment {
    return {
      id: d.id,
      paymentNumber: d.paymentNumber,
      invoiceId: d.invoiceId,
      customerId: d.customerId,
      customerName: d.customerName,
      amount: d.amount,
      paymentDate: new Date(d.paymentDate),
      paymentMethod: d.paymentMethod,
      status: d.status as Payment['status'],
      reference: d.reference,
      notes: d.notes,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }

  private toInvoiceEntity(d: InvoiceResponseDto): Invoice {
    return {
      id: d.id,
      invoiceNumber: d.invoiceNumber,
      paymentId: d.paymentId,
      customerId: d.customerId,
      customerName: d.customerName,
      items: d.items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total,
      })),
      subtotal: d.subtotal,
      vat: d.vat,
      total: d.total,
      status: d.status,
      issuedDate: new Date(d.issuedDate),
      dueDate: new Date(d.dueDate),
      paidDate: d.paidDate ? new Date(d.paidDate) : undefined,
    };
  }
}
