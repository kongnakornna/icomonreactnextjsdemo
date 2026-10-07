import { IInventoryRepository } from '../repositories/inventory.repository';
import { Product } from '../entities/product.entity';

export class GetProductUseCase {
  constructor(private repo: IInventoryRepository) {}

  async execute(id: string): Promise<Product> {
    return this.repo.getProduct(id);
  }
}
