import { IDocumentRepository } from '../repositories/document.repository';

export class ShareDocumentUseCase {
  constructor(private repo: IDocumentRepository) {}

  async execute(id: string, userIds: string[]): Promise<void> {
    return this.repo.share(id, userIds);
  }
}
