import { IDocumentRepository } from '../repositories/document.repository';
import { AppDocument } from '../entities/document.entity';

export class UploadDocumentUseCase {
  constructor(private repo: IDocumentRepository) {}

  async execute(file: File, metadata: { description?: string; tags?: string[]; folderId?: string }): Promise<AppDocument> {
    return this.repo.upload(file, metadata);
  }
}
