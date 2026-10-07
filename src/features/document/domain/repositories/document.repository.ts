import { AppDocument, DocumentFolder } from '../entities/document.entity';

export interface IDocumentRepository {
  list(params?: { search?: string; folderId?: string }): Promise<AppDocument[]>;
  getById(id: string): Promise<AppDocument | undefined>;
  upload(file: File, metadata: { description?: string; tags?: string[]; folderId?: string }): Promise<AppDocument>;
  delete(id: string): Promise<void>;
  share(id: string, userIds: string[]): Promise<void>;
  listFolders(): Promise<DocumentFolder[]>;
}
