'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PurchaseOrder } from '../../domain/entities/purchase-order.entity';
import { GetPurchaseOrderUseCase } from '../../domain/use-cases/get-purchase-order.use-case';
import { ApprovePurchaseOrderUseCase } from '../../domain/use-cases/approve-purchase-order.use-case';
import { PurchaseOrderApiDataSource } from '../../data/datasources/purchase-order.api.datasource';
import { PurchaseOrderRepositoryImpl } from '../../data/repositories/purchase-order.repository.impl';

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

export default function PODetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [po, setPo] = useState<PurchaseOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPO();
  }, [id]);

  const loadPO = async () => {
    try {
      setLoading(true);
      setError(null);
      const ds = new PurchaseOrderApiDataSource();
      const repo = new PurchaseOrderRepositoryImpl(ds);
      const result = await new GetPurchaseOrderUseCase(repo).execute(id);
      setPo(result);
    } catch {
      setError('Failed to load purchase order');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!po) return;
    try {
      setApproving(true);
      setError(null);
      const ds = new PurchaseOrderApiDataSource();
      const repo = new PurchaseOrderRepositoryImpl(ds);
      const updated = await new ApprovePurchaseOrderUseCase(repo).execute(po.id);
      setPo(updated);
    } catch {
      setError('Failed to approve purchase order');
    } finally {
      setApproving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  if (error && !po) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (!po) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{po.poNumber}</h1>
          <p className="text-gray-500 text-sm mt-1">Supplier: {po.supplierName}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${statusColors[po.status] ?? 'bg-gray-100 text-gray-800'}`}>
            {po.status}
          </span>
          {po.status === 'pending' && (
            <button
              onClick={handleApprove}
              disabled={approving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {approving ? 'Approving...' : 'Approve'}
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500">Created By</p>
            <p className="text-gray-900">{po.createdBy}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="text-gray-900">{formatDate(po.createdAt)}</p>
          </div>
          {po.expectedDelivery && (
            <div>
              <p className="text-sm text-gray-500">Expected Delivery</p>
              <p className="text-gray-900">{formatDate(po.expectedDelivery)}</p>
            </div>
          )}
          {po.approvedBy && (
            <div>
              <p className="text-sm text-gray-500">Approved By</p>
              <p className="text-gray-900">{po.approvedBy}</p>
            </div>
          )}
          {po.quotationId && (
            <div>
              <p className="text-sm text-gray-500">Quotation ID</p>
              <p className="text-gray-900">{po.quotationId}</p>
            </div>
          )}
        </div>

        {po.notes && (
          <div className="mb-6">
            <p className="text-sm text-gray-500">Notes</p>
            <p className="text-gray-900">{po.notes}</p>
          </div>
        )}

        <h2 className="text-lg font-medium mb-4">Items</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {po.items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-sm text-gray-900">{item.productName}</td>
                <td className="px-4 py-3 text-sm text-gray-700 text-right">{item.quantity}</td>
                <td className="px-4 py-3 text-sm text-gray-700 text-right">{formatCurrency(item.unitPrice)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900">{formatCurrency(po.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">VAT (7%)</span>
              <span className="text-gray-900">{formatCurrency(po.vat)}</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">{formatCurrency(po.total)}</span>
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
    </div>
  );
}
