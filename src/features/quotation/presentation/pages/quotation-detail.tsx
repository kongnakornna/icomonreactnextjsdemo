'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Quotation } from '../../domain/entities/quotation.entity';
import { GetQuotationUseCase } from '../../domain/use-cases/get-quotation.use-case';
import { ApproveQuotationUseCase } from '../../domain/use-cases/approve-quotation.use-case';
import { RejectQuotationUseCase } from '../../domain/use-cases/reject-quotation.use-case';
import { QuotationApiDataSource } from '../../data/datasources/quotation.api.datasource';
import { QuotationRepositoryImpl } from '../../data/repositories/quotation.repository.impl';

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'THB' }).format(amount);

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);

export default function QuotationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    loadQuotation();
  }, [id]);

  const loadQuotation = async () => {
    try {
      setLoading(true);
      setError(null);
      const ds = new QuotationApiDataSource();
      const repo = new QuotationRepositoryImpl(ds);
      const result = await new GetQuotationUseCase(repo).execute(id);
      setQuotation(result);
    } catch {
      setError('Failed to load quotation');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!quotation) return;
    try {
      setActing(true);
      setError(null);
      const ds = new QuotationApiDataSource();
      const repo = new QuotationRepositoryImpl(ds);
      const updated = await new ApproveQuotationUseCase(repo).execute(quotation.id);
      setQuotation(updated);
    } catch {
      setError('Failed to approve quotation');
    } finally {
      setActing(false);
    }
  };

  const handleReject = async () => {
    if (!quotation) return;
    try {
      setActing(true);
      setError(null);
      const ds = new QuotationApiDataSource();
      const repo = new QuotationRepositoryImpl(ds);
      const updated = await new RejectQuotationUseCase(repo).execute(quotation.id, rejectReason || undefined);
      setQuotation(updated);
      setShowRejectModal(false);
      setRejectReason('');
    } catch {
      setError('Failed to reject quotation');
    } finally {
      setActing(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  if (error && !quotation) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (!quotation) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{quotation.quotationNumber}</h1>
          <p className="text-gray-500 text-sm mt-1">{quotation.subject}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${statusColors[quotation.status] ?? 'bg-gray-100 text-gray-800'}`}>
            {quotation.status}
          </span>
          {quotation.status === 'pending' && (
            <>
              <button
                onClick={handleApprove}
                disabled={acting}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {acting ? 'Processing...' : 'Approve'}
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                disabled={acting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="text-gray-900">{quotation.customerName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created By</p>
            <p className="text-gray-900">{quotation.createdBy}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Valid Until</p>
            <p className="text-gray-900">{formatDate(quotation.validUntil)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="text-gray-900">{formatDate(quotation.createdAt)}</p>
          </div>
          {quotation.approvedBy && (
            <div>
              <p className="text-sm text-gray-500">Approved By</p>
              <p className="text-gray-900">{quotation.approvedBy}</p>
            </div>
          )}
        </div>

        {quotation.notes && (
          <div className="mb-6">
            <p className="text-sm text-gray-500">Notes</p>
            <p className="text-gray-900">{quotation.notes}</p>
          </div>
        )}

        <h2 className="text-lg font-medium mb-4">Items</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Discount</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {quotation.items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                <td className="px-4 py-3 text-sm text-gray-700 text-right">{item.quantity}</td>
                <td className="px-4 py-3 text-sm text-gray-700 text-right">{formatCurrency(item.unitPrice)}</td>
                <td className="px-4 py-3 text-sm text-red-600 text-right">
                  {item.discount > 0 ? `-${formatCurrency(item.discount)}` : '-'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <div className="w-72 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900">{formatCurrency(quotation.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Discount</span>
              <span className="text-red-600">-{formatCurrency(quotation.discount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">VAT (7%)</span>
              <span className="text-gray-900">{formatCurrency(quotation.vat)}</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">{formatCurrency(quotation.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
      </div>

      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Reject Quotation</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Reason for rejection (optional)"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={acting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {acting ? 'Rejecting...' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
