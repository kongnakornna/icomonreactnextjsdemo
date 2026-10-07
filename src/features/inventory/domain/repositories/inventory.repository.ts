import { Product, ProductListParams, PaginatedProducts, StockMovement, Category } from '../entities/product.entity';

export interface IInventoryRepository {
  listProducts(params?: ProductListParams): Promise<PaginatedProducts>;
  getProduct(id: string): Promise<Product>;
  createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'currentStock'>): Promise<Product>;
  updateProduct(id: string, data: Partial<Product>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  adjustStock(id: string, type: 'in' | 'out' | 'adjust', quantity: number, note: string): Promise<Product>;
  getStockMovements(id: string): Promise<StockMovement[]>;
  getLowStockProducts(): Promise<Product[]>;
  listCategories(): Promise<Category[]>;
}
