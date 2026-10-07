import { IInventoryRepository } from '../repositories/inventory.repository';
import { Category } from '../entities/product.entity';

export class ListCategoriesUseCase {
  constructor(private repo: IInventoryRepository) {}

  async execute(): Promise<Category[]> {
    return this.repo.listCategories();
  }
}
