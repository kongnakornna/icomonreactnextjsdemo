import { IDocumentRepository } from '../repositories/document.repository';

export class DeleteDocumentUseCase {
  constructor(private repo: IDocumentRepository) {}

  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
