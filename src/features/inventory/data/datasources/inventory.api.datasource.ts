import { ProductResponseDto, StockMovementResponseDto, CategoryResponseDto, PaginatedProductsResponseDto } from '../dtos/inventory.dto';
import { ProductListParams } from '../../domain/entities/product.entity';

export class InventoryApiDataSource {
  private baseUrl = '/api/products';

  async listProducts(params?: ProductListParams): Promise<PaginatedProductsResponseDto> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.categoryId) searchParams.set('categoryId', params.categoryId);
    if (params?.isActive !== undefined) searchParams.set('isActive', String(params.isActive));
    if (params?.lowStock) searchParams.set('lowStock', 'true');
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    const query = searchParams.toString();
    const response = await fetch(`${this.baseUrl}${query ? `?${query}` : ''}`);
    return response.json();
  }

  async getProduct(id: string): Promise<ProductResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  async createProduct(data: Record<string, unknown>): Promise<ProductResponseDto> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async updateProduct(id: string, data: Record<string, unknown>): Promise<ProductResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async deleteProduct(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, { method: 'DELETE' });
  }

  async adjustStock(id: string, type: string, quantity: number, note: string): Promise<ProductResponseDto> {
    const response = await fetch(`${this.baseUrl}/${id}/stock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, quantity, note }),
    });
    return response.json();
  }

  async getStockMovements(id: string): Promise<StockMovementResponseDto[]> {
    const response = await fetch(`${this.baseUrl}/${id}/movements`);
    return response.json();
  }

  async getLowStockProducts(): Promise<ProductResponseDto[]> {
    const response = await fetch(`${this.baseUrl}?lowStock=true`);
    return response.json();
  }

  async listCategories(): Promise<CategoryResponseDto[]> {
    const response = await fetch('/api/products/categories');
    return response.json();
  }
}
