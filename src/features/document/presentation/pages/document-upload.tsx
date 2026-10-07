'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadDocumentUseCase } from '../../domain/use-cases/upload-document.use-case';
import { DocumentApiDataSource } from '../../data/datasources/document.api.datasource';
import { DocumentRepositoryImpl } from '../../data/repositories/document.repository.impl';
import { useToast } from '@/app/_components/shared/toast-provider';

export default function DocumentUploadPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [metadata, setMetadata] = useState({
    description: '',
    tags: '',
    folderId: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const datasource = new DocumentApiDataSource();
      const repo = new DocumentRepositoryImpl(datasource);
      const useCase = new UploadDocumentUseCase(repo);
      await useCase.execute(selectedFile, {
        description: metadata.description || undefined,
        tags: metadata.tags ? metadata.tags.split(',').map((t) => t.trim()).filter(Boolean) : undefined,
        folderId: metadata.folderId || undefined,
      });
      showToast('Document uploaded successfully', 'success');
      router.push('/documents');
    } catch (err) {
      setError('Failed to upload document');
      showToast('Failed to upload document', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Upload Document</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
          {selectedFile ? (
            <div>
              <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600">Drag and drop a file here, or click to select</p>
              <p className="text-xs text-gray-400 mt-1">Any file type</p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={metadata.description}
            onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <input
            type="text"
            value={metadata.tags}
            onChange={(e) => setMetadata({ ...metadata, tags: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Comma-separated tags"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Folder ID</label>
          <input
            type="text"
            value={metadata.folderId}
            onChange={(e) => setMetadata({ ...metadata, folderId: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Optional folder ID"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.push('/documents')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !selectedFile}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
  );
}
