import { IDocumentRepository } from '../repositories/document.repository';
import { AppDocument } from '../entities/document.entity';

export class GetDocumentUseCase {
  constructor(private repo: IDocumentRepository) {}

  async execute(id: string): Promise<AppDocument | undefined> {
    return this.repo.getById(id);
  }
}
