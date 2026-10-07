import { IInventoryRepository } from '../../domain/repositories/inventory.repository';
import { Product, ProductListParams, PaginatedProducts, StockMovement, Category } from '../../domain/entities/product.entity';
import { InventoryApiDataSource } from '../datasources/inventory.api.datasource';
import { ProductResponseDto, StockMovementResponseDto, CategoryResponseDto, PaginatedProductsResponseDto } from '../dtos/inventory.dto';

export class InventoryRepositoryImpl implements IInventoryRepository {
  constructor(private ds: InventoryApiDataSource) {}

  async listProducts(params?: ProductListParams): Promise<PaginatedProducts> {
    const dto = await this.ds.listProducts(params);
    return this.toPaginatedProducts(dto);
  }

  async getProduct(id: string): Promise<Product> {
    const dto = await this.ds.getProduct(id);
    return this.toProductEntity(dto);
  }

  async createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'currentStock'>): Promise<Product> {
    const dto = await this.ds.createProduct(data as unknown as Record<string, unknown>);
    return this.toProductEntity(dto);
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const dto = await this.ds.updateProduct(id, data as unknown as Record<string, unknown>);
    return this.toProductEntity(dto);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.ds.deleteProduct(id);
  }

  async adjustStock(id: string, type: 'in' | 'out' | 'adjust', quantity: number, note: string): Promise<Product> {
    const dto = await this.ds.adjustStock(id, type, quantity, note);
    return this.toProductEntity(dto);
  }

  async getStockMovements(id: string): Promise<StockMovement[]> {
    const dtos = await this.ds.getStockMovements(id);
    return dtos.map(d => this.toStockMovementEntity(d));
  }

  async getLowStockProducts(): Promise<Product[]> {
    const dtos = await this.ds.getLowStockProducts();
    return dtos.map(d => this.toProductEntity(d));
  }

  async listCategories(): Promise<Category[]> {
    const dtos = await this.ds.listCategories();
    return dtos.map(d => this.toCategoryEntity(d));
  }

  private toProductEntity(d: ProductResponseDto): Product {
    return {
      id: d.id,
      code: d.code,
      name: d.name,
      description: d.description,
      categoryId: d.categoryId,
      categoryName: d.categoryName,
      unit: d.unit,
      price: d.price,
      cost: d.cost,
      currentStock: d.currentStock,
      minimumStock: d.minimumStock,
      barcode: d.barcode,
      isActive: d.isActive,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }

  private toStockMovementEntity(d: StockMovementResponseDto): StockMovement {
    return {
      id: d.id,
      productId: d.productId,
      productName: d.productName,
      type: d.type,
      quantity: d.quantity,
      beforeStock: d.beforeStock,
      afterStock: d.afterStock,
      reference: d.reference,
      note: d.note,
      createdBy: d.createdBy,
      createdAt: new Date(d.createdAt),
    };
  }

  private toCategoryEntity(d: CategoryResponseDto): Category {
    return {
      id: d.id,
      name: d.name,
      description: d.description,
    };
  }

  private toPaginatedProducts(d: PaginatedProductsResponseDto): PaginatedProducts {
    return {
      data: d.data.map(item => this.toProductEntity(item)),
      total: d.total,
      page: d.page,
      limit: d.limit,
    };
  }
}
