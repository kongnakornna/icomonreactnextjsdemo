import { IInventoryRepository } from '../repositories/inventory.repository';
import { Product } from '../entities/product.entity';

export class UpdateProductUseCase {
  constructor(private repo: IInventoryRepository) {}

  async execute(id: string, data: Partial<Product>): Promise<Product> {
    return this.repo.updateProduct(id, data);
  }
}
