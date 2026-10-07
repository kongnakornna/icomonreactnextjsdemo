export interface AppDocumentResponseDto {
  id: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  fileType: string;
  folderId?: string;
  folderName?: string;
  tags: string[];
  description?: string;
  url: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentFolderResponseDto {
  id: string;
  name: string;
  parentId?: string;
  createdAt: string;
}

export interface ShareDocumentRequestDto {
  userIds: string[];
}
