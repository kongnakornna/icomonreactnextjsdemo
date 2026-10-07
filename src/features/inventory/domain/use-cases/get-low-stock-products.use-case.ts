import { IInventoryRepository } from '../repositories/inventory.repository';
import { Product } from '../entities/product.entity';

export class GetLowStockProductsUseCase {
  constructor(private repo: IInventoryRepository) {}

  async execute(): Promise<Product[]> {
    return this.repo.getLowStockProducts();
  }
}
