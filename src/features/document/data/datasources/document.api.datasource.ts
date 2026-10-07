import { apiFetch } from '@/src/core/utils/api-fetch';
import { AppDocumentResponseDto, DocumentFolderResponseDto, ShareDocumentRequestDto } from '../dtos/document.dto';

export class DocumentApiDataSource {
  private baseUrl = '/api/documents';
  private foldersUrl = '/api/document-folders';

  async list(params?: { search?: string; folderId?: string }): Promise<AppDocumentResponseDto[]> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.folderId) searchParams.set('folderId', params.folderId);
    const query = searchParams.toString();
    return apiFetch<AppDocumentResponseDto[]>(`${this.baseUrl}${query ? `?${query}` : ''}`);
  }

  async getById(id: string): Promise<AppDocumentResponseDto> {
    return apiFetch<AppDocumentResponseDto>(`${this.baseUrl}/${id}`);
  }

  async upload(file: File, metadata: { description?: string; tags?: string[]; folderId?: string }): Promise<AppDocumentResponseDto> {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata.description) formData.append('description', metadata.description);
    if (metadata.tags) formData.append('tags', JSON.stringify(metadata.tags));
    if (metadata.folderId) formData.append('folderId', metadata.folderId);

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    return response.json();
  }

  async delete(id: string): Promise<void> {
    await apiFetch<void>(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }

  async share(id: string, userIds: string[]): Promise<void> {
    await apiFetch<void>(`${this.baseUrl}/${id}/share`, {
      method: 'POST',
      body: JSON.stringify({ userIds } as ShareDocumentRequestDto),
    });
  }

  async listFolders(): Promise<DocumentFolderResponseDto[]> {
    return apiFetch<DocumentFolderResponseDto[]>(this.foldersUrl);
  }
}
