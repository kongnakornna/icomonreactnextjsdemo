import { IWebOrderRepository } from '../../domain/repositories/web-order.repository';
import { WebOrder, WebOrderListParams, PaginatedWebOrders, OrderStatus, CreateWebOrderInput } from '../../domain/entities/web-order.entity';
import { WebOrderApiDataSource } from '../datasources/web-order.api.datasource';
import { WebOrderResponseDto, OrderItemResponseDto, PaginatedWebOrdersResponseDto } from '../dtos/web-order.dto';

export class WebOrderRepositoryImpl implements IWebOrderRepository {
  constructor(private ds: WebOrderApiDataSource) {}

  async list(params?: WebOrderListParams): Promise<PaginatedWebOrders> {
    const dto = await this.ds.list(params);
    return this.toPaginatedOrders(dto);
  }

  async getById(id: string): Promise<WebOrder> {
    const dto = await this.ds.getById(id);
    return this.toOrderEntity(dto);
  }

  async create(data: CreateWebOrderInput): Promise<WebOrder> {
    const dto = await this.ds.create(data as unknown as Record<string, unknown>);
    return this.toOrderEntity(dto);
  }

  async updateStatus(id: string, status: OrderStatus): Promise<WebOrder> {
    const dto = await this.ds.updateStatus(id, status);
    return this.toOrderEntity(dto);
  }

  async cancel(id: string): Promise<WebOrder> {
    const dto = await this.ds.cancel(id);
    return this.toOrderEntity(dto);
  }

  private toOrderEntity(d: WebOrderResponseDto): WebOrder {
    return {
      id: d.id,
      orderNumber: d.orderNumber,
      customerId: d.customerId,
      customerName: d.customerName,
      customerEmail: d.customerEmail,
      items: d.items.map(i => this.toItemEntity(i)),
      subtotal: d.subtotal,
      shippingCost: d.shippingCost,
      vat: d.vat,
      total: d.total,
      status: d.status as OrderStatus,
      channel: d.channel as WebOrder['channel'],
      shippingAddress: d.shippingAddress,
      trackingNumber: d.trackingNumber,
      notes: d.notes,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }

  private toItemEntity(d: OrderItemResponseDto) {
    return {
      id: d.id,
      productId: d.productId,
      productName: d.productName,
      quantity: d.quantity,
      unitPrice: d.unitPrice,
      total: d.total,
    };
  }

  private toPaginatedOrders(d: PaginatedWebOrdersResponseDto): PaginatedWebOrders {
    return {
      data: d.data.map(item => this.toOrderEntity(item)),
      total: d.total,
      page: d.page,
      limit: d.limit,
    };
  }
}
