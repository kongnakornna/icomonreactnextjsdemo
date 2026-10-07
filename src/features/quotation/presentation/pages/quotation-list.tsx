'use client';

import { useEffect, useState } from 'react';
import { Quotation } from '../../domain/entities/quotation.entity';
import { ListQuotationsUseCase } from '../../domain/use-cases/list-quotations.use-case';
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

export default function QuotationListPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadQuotations();
  }, [page, statusFilter]);

  const loadQuotations = async () => {
    try {
      setLoading(true);
      setError(null);
      const ds = new QuotationApiDataSource();
      const repo = new QuotationRepositoryImpl(ds);
      const result = await new ListQuotationsUseCase(repo).execute({
        page,
        limit: 10,
        status: statusFilter || undefined,
        search: search || undefined,
      });
      setQuotations(result.data);
      setTotal(result.total);
    } catch {
      setError('Failed to load quotations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quotations</h1>
        <a
          href="/quotations/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          New Quotation
        </a>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search quotations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && loadQuotations()}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Until</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No quotations found
                  </td>
                </tr>
              ) : (
                quotations.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                      <a href={`/quotations/${q.id}`}>{q.quotationNumber}</a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{q.customerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{q.subject}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formatCurrency(q.total)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(q.validUntil)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[q.status] ?? 'bg-gray-100 text-gray-800'}`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`/quotations/${q.id}`} className="text-sm text-blue-600 hover:text-blue-800">
                        View
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {total > 10 && (
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
              <span className="text-sm text-gray-500">Total: {total} quotations</span>
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
                  disabled={quotations.length < 10}
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
