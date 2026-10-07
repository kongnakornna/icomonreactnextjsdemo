'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppDocument } from '../../domain/entities/document.entity';
import { GetDocumentUseCase } from '../../domain/use-cases/get-document.use-case';
import { ShareDocumentUseCase } from '../../domain/use-cases/share-document.use-case';
import { DeleteDocumentUseCase } from '../../domain/use-cases/delete-document.use-case';
import { DocumentApiDataSource } from '../../data/datasources/document.api.datasource';
import { DocumentRepositoryImpl } from '../../data/repositories/document.repository.impl';
import { useToast } from '@/app/_components/shared/toast-provider';

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default function DocumentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const [document, setDocument] = useState<AppDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUserIds, setShareUserIds] = useState('');
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    loadDocument();
  }, [params.id]);

  const loadDocument = async () => {
    try {
      setLoading(true);
      const datasource = new DocumentApiDataSource();
      const repo = new DocumentRepositoryImpl(datasource);
      const useCase = new GetDocumentUseCase(repo);
      const result = await useCase.execute(params.id as string);
      if (result) {
        setDocument(result);
      } else {
        setError('Document not found');
      }
    } catch (err) {
      setError('Failed to load document');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!document) return;
    try {
      setSharing(true);
      const datasource = new DocumentApiDataSource();
      const repo = new DocumentRepositoryImpl(datasource);
      const useCase = new ShareDocumentUseCase(repo);
      const userIds = shareUserIds.split(',').map((id) => id.trim()).filter(Boolean);
      await useCase.execute(document.id, userIds);
      showToast('Document shared successfully', 'success');
      setShowShareModal(false);
      setShareUserIds('');
    } catch (err) {
      showToast('Failed to share document', 'error');
    } finally {
      setSharing(false);
    }
  };

  const handleDelete = async () => {
    if (!document) return;
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      const datasource = new DocumentApiDataSource();
      const repo = new DocumentRepositoryImpl(datasource);
      const useCase = new DeleteDocumentUseCase(repo);
      await useCase.execute(document.id);
      showToast('Document deleted successfully', 'success');
      router.push('/documents');
    } catch (err) {
      showToast('Failed to delete document', 'error');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!document) {
    return <div className="text-gray-500">Document not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{document.originalName}</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowShareModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Share
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">File Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{document.fileName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Type</dt>
            <dd className="mt-1 text-sm text-gray-900">{document.fileType}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Size</dt>
            <dd className="mt-1 text-sm text-gray-900">{formatFileSize(document.fileSize)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Folder</dt>
            <dd className="mt-1 text-sm text-gray-900">{document.folderName || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Uploaded By</dt>
            <dd className="mt-1 text-sm text-gray-900">{document.uploadedBy}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="mt-1 text-sm text-gray-900">{new Date(document.createdAt).toLocaleString()}</dd>
          </div>
        </div>

        {document.description && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{document.description}</dd>
          </div>
        )}

        {document.tags.length > 0 && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Tags</dt>
            <dd className="mt-1 flex flex-wrap gap-1">
              {document.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </dd>
          </div>
        )}

        <div className="pt-4">
          <a
            href={document.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Open File
          </a>
        </div>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 space-y-4">
            <h2 className="text-lg font-medium">Share Document</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">User IDs (comma-separated)</label>
              <input
                type="text"
                value={shareUserIds}
                onChange={(e) => setShareUserIds(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="user-id-1, user-id-2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleShare}
                disabled={sharing}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {sharing ? 'Sharing...' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
