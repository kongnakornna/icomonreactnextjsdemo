import { IInventoryRepository } from '../repositories/inventory.repository';
import { ProductListParams, PaginatedProducts } from '../entities/product.entity';

export class ListProductsUseCase {
  constructor(private repo: IInventoryRepository) {}

  async execute(params?: ProductListParams): Promise<PaginatedProducts> {
    return this.repo.listProducts(params);
  }
}
