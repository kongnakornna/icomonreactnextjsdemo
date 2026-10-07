import { IInventoryRepository } from '../repositories/inventory.repository';
import { Product } from '../entities/product.entity';

export class CreateProductUseCase {
  constructor(private repo: IInventoryRepository) {}

  async execute(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'currentStock'>): Promise<Product> {
    return this.repo.createProduct(data);
  }
}
