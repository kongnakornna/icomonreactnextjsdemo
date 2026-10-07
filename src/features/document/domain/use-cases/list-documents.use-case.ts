import { IDocumentRepository } from '../repositories/document.repository';
import { AppDocument } from '../entities/document.entity';

export class ListDocumentsUseCase {
  constructor(private repo: IDocumentRepository) {}

  async execute(params?: { search?: string; folderId?: string }): Promise<AppDocument[]> {
    return this.repo.list(params);
  }
}
