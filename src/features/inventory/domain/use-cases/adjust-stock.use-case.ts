import { IInventoryRepository } from '../repositories/inventory.repository';
import { Product } from '../entities/product.entity';

export class AdjustStockUseCase {
  constructor(private repo: IInventoryRepository) {}

  async execute(id: string, type: 'in' | 'out' | 'adjust', quantity: number, note: string): Promise<Product> {
    return this.repo.adjustStock(id, type, quantity, note);
  }
}
