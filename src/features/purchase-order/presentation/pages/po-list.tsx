'use client';

import { useEffect, useState } from 'react';
import { PurchaseOrder } from '../../domain/entities/purchase-order.entity';
import { ListPurchaseOrdersUseCase } from '../../domain/use-cases/list-purchase-orders.use-case';
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

export default function POListPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadOrders();
  }, [page, statusFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const ds = new PurchaseOrderApiDataSource();
      const repo = new PurchaseOrderRepositoryImpl(ds);
      const result = await new ListPurchaseOrdersUseCase(repo).execute({
        page,
        limit: 10,
        status: statusFilter || undefined,
        search: search || undefined,
      });
      setOrders(result.data);
      setTotal(result.total);
    } catch {
      setError('Failed to load purchase orders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Purchase Orders</h1>
        <a
          href="/purchase-orders/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          New Purchase Order
        </a>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search purchase orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && loadOrders()}
          className="border border-gray-300 rounded-lg px-3 py-2 w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">Loading...</div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No purchase orders found
                  </td>
                </tr>
              ) : (
                orders.map((po) => (
                  <tr key={po.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                      <a href={`/purchase-orders/${po.id}`}>{po.poNumber}</a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{po.supplierName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{po.items.length} items</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formatCurrency(po.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[po.status] ?? 'bg-gray-100 text-gray-800'}`}>
                        {po.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(po.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {total > 10 && (
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
              <span className="text-sm text-gray-500">Total: {total} purchase orders</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm">Page {page}</span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={orders.length < 10}
                  className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
