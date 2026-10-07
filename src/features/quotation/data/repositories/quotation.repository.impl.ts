import { IQuotationRepository, ListQuotationsParams } from '../../domain/repositories/quotation.repository';
import { Quotation } from '../../domain/entities/quotation.entity';
import { QuotationApiDataSource } from '../datasources/quotation.api.datasource';
import {
  QuotationResponseDto,
  CreateQuotationRequestDto,
} from '../dtos/quotation.dto';

export class QuotationRepositoryImpl implements IQuotationRepository {
  constructor(private ds: QuotationApiDataSource) {}

  async list(params?: ListQuotationsParams): Promise<{ data: Quotation[]; total: number }> {
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
      data: dto.data.map(d => this.toEntity(d)),
      total: dto.total,
    };
  }

  async getById(id: string): Promise<Quotation> {
    const dto = await this.ds.getById(id);
    return this.toEntity(dto);
  }

  async create(data: Omit<Quotation, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Quotation> {
    const requestDto: CreateQuotationRequestDto = {
      quotationNumber: data.quotationNumber,
      customerId: data.customerId,
      customerName: data.customerName,
      subject: data.subject,
      items: data.items.map(item => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount,
        total: item.total,
      })),
      subtotal: data.subtotal,
      discount: data.discount,
      vat: data.vat,
      total: data.total,
      validUntil: data.validUntil.toISOString(),
      notes: data.notes,
      createdBy: data.createdBy,
    };
    const dto = await this.ds.create(requestDto);
    return this.toEntity(dto);
  }

  async update(id: string, data: Partial<Quotation>): Promise<Quotation> {
    const requestDto: Partial<CreateQuotationRequestDto> = {};
    if (data.customerId !== undefined) requestDto.customerId = data.customerId;
    if (data.customerName !== undefined) requestDto.customerName = data.customerName;
    if (data.subject !== undefined) requestDto.subject = data.subject;
    if (data.items !== undefined) {
      requestDto.items = data.items.map(item => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount,
        total: item.total,
      }));
    }
    if (data.subtotal !== undefined) requestDto.subtotal = data.subtotal;
    if (data.discount !== undefined) requestDto.discount = data.discount;
    if (data.vat !== undefined) requestDto.vat = data.vat;
    if (data.total !== undefined) requestDto.total = data.total;
    if (data.validUntil !== undefined) requestDto.validUntil = data.validUntil.toISOString();
    if (data.notes !== undefined) requestDto.notes = data.notes;
    const dto = await this.ds.update(id, requestDto);
    return this.toEntity(dto);
  }

  async approve(id: string): Promise<Quotation> {
    const dto = await this.ds.approve(id);
    return this.toEntity(dto);
  }

  async reject(id: string, reason?: string): Promise<Quotation> {
    const dto = await this.ds.reject(id, reason);
    return this.toEntity(dto);
  }

  private toEntity(d: QuotationResponseDto): Quotation {
    return {
      id: d.id,
      quotationNumber: d.quotationNumber,
      customerId: d.customerId,
      customerName: d.customerName,
      subject: d.subject,
      items: d.items.map(item => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount,
        total: item.total,
      })),
      subtotal: d.subtotal,
      discount: d.discount,
      vat: d.vat,
      total: d.total,
      status: d.status as Quotation['status'],
      validUntil: new Date(d.validUntil),
      notes: d.notes,
      createdBy: d.createdBy,
      approvedBy: d.approvedBy,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }
}
