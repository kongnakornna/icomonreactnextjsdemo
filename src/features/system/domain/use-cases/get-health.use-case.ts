import { ISystemRepository } from '../repositories/system.repository';
import { System } from '../entities/system.entity';

export class GetHealthUseCase {
  constructor(private repository: ISystemRepository) {}

  async execute(): Promise<System> {
    return this.repository.getHealth();
  }
}
