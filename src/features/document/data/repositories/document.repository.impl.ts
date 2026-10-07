import { IDocumentRepository } from '../../domain/repositories/document.repository';
import { AppDocument, DocumentFolder } from '../../domain/entities/document.entity';
import { DocumentApiDataSource } from '../datasources/document.api.datasource';
import { AppDocumentResponseDto, DocumentFolderResponseDto } from '../dtos/document.dto';

export class DocumentRepositoryImpl implements IDocumentRepository {
  constructor(private ds: DocumentApiDataSource) {}

  async list(params?: { search?: string; folderId?: string }): Promise<AppDocument[]> {
    const dtos = await this.ds.list(params);
    return dtos.map((d) => this.toDocumentEntity(d));
  }

  async getById(id: string): Promise<AppDocument | undefined> {
    try {
      const dto = await this.ds.getById(id);
      return this.toDocumentEntity(dto);
    } catch {
      return undefined;
    }
  }

  async upload(file: File, metadata: { description?: string; tags?: string[]; folderId?: string }): Promise<AppDocument> {
    const dto = await this.ds.upload(file, metadata);
    return this.toDocumentEntity(dto);
  }

  async delete(id: string): Promise<void> {
    await this.ds.delete(id);
  }

  async share(id: string, userIds: string[]): Promise<void> {
    await this.ds.share(id, userIds);
  }

  async listFolders(): Promise<DocumentFolder[]> {
    const dtos = await this.ds.listFolders();
    return dtos.map((d) => this.toFolderEntity(d));
  }

  private toDocumentEntity(d: AppDocumentResponseDto): AppDocument {
    return {
      id: d.id,
      fileName: d.fileName,
      originalName: d.originalName,
      fileSize: d.fileSize,
      fileType: d.fileType,
      folderId: d.folderId,
      folderName: d.folderName,
      tags: d.tags || [],
      description: d.description,
      url: d.url,
      uploadedBy: d.uploadedBy,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }

  private toFolderEntity(d: DocumentFolderResponseDto): DocumentFolder {
    return {
      id: d.id,
      name: d.name,
      parentId: d.parentId,
      createdAt: new Date(d.createdAt),
    };
  }
}
