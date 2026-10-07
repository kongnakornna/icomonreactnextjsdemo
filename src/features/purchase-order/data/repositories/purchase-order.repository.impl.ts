import { IPurchaseOrderRepository, ListPurchaseOrdersParams } from '../../domain/repositories/purchase-order.repository';
import { PurchaseOrder } from '../../domain/entities/purchase-order.entity';
import { PurchaseOrderApiDataSource } from '../datasources/purchase-order.api.datasource';
import {
  PurchaseOrderResponseDto,
  CreatePurchaseOrderRequestDto,
} from '../dtos/purchase-order.dto';

export class PurchaseOrderRepositoryImpl implements IPurchaseOrderRepository {
  constructor(private ds: PurchaseOrderApiDataSource) {}

  async list(params?: ListPurchaseOrdersParams): Promise<{ data: PurchaseOrder[]; total: number }> {
    const query: Record<string, string> = {};
    if (params) {
      if (params.page !== undefined) query.page = String(params.page);
      if (params.limit !== undefined) query.limit = String(params.limit);
      if (params.status) query.status = params.status;
      if (params.search) query.search = params.search;
    }
    const dto = await this.ds.list(query);
    return {
      data: dto.data.map(d => this.toEntity(d)),
      total: dto.total,
    };
  }

  async getById(id: string): Promise<PurchaseOrder> {
    const dto = await this.ds.getById(id);
    return this.toEntity(dto);
  }

  async create(data: Omit<PurchaseOrder, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<PurchaseOrder> {
    const requestDto: CreatePurchaseOrderRequestDto = {
      poNumber: data.poNumber,
      quotationId: data.quotationId,
      supplierName: data.supplierName,
      items: data.items.map(item => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total,
      })),
      subtotal: data.subtotal,
      vat: data.vat,
      total: data.total,
      expectedDelivery: data.expectedDelivery?.toISOString(),
      notes: data.notes,
      createdBy: data.createdBy,
    };
    const dto = await this.ds.create(requestDto);
    return this.toEntity(dto);
  }

  async update(id: string, data: Partial<PurchaseOrder>): Promise<PurchaseOrder> {
    const requestDto: Partial<CreatePurchaseOrderRequestDto> = {};
    if (data.supplierName !== undefined) requestDto.supplierName = data.supplierName;
    if (data.items !== undefined) {
      requestDto.items = data.items.map(item => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total,
      }));
    }
    if (data.subtotal !== undefined) requestDto.subtotal = data.subtotal;
    if (data.vat !== undefined) requestDto.vat = data.vat;
    if (data.total !== undefined) requestDto.total = data.total;
    if (data.expectedDelivery !== undefined) requestDto.expectedDelivery = data.expectedDelivery.toISOString();
    if (data.notes !== undefined) requestDto.notes = data.notes;
    const dto = await this.ds.update(id, requestDto);
    return this.toEntity(dto);
  }

  async approve(id: string): Promise<PurchaseOrder> {
    const dto = await this.ds.approve(id);
    return this.toEntity(dto);
  }

  private toEntity(d: PurchaseOrderResponseDto): PurchaseOrder {
    return {
      id: d.id,
      poNumber: d.poNumber,
      quotationId: d.quotationId,
      supplierName: d.supplierName,
      items: d.items.map(item => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total,
      })),
      subtotal: d.subtotal,
      vat: d.vat,
      total: d.total,
      status: d.status as PurchaseOrder['status'],
      expectedDelivery: d.expectedDelivery ? new Date(d.expectedDelivery) : undefined,
      notes: d.notes,
      createdBy: d.createdBy,
      approvedBy: d.approvedBy,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }
}
