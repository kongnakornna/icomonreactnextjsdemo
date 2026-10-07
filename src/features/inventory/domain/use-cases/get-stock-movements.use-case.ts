import { IInventoryRepository } from '../repositories/inventory.repository';
import { StockMovement } from '../entities/product.entity';

export class GetStockMovementsUseCase {
  constructor(private repo: IInventoryRepository) {}

  async execute(id: string): Promise<StockMovement[]> {
    return this.repo.getStockMovements(id);
  }
}
