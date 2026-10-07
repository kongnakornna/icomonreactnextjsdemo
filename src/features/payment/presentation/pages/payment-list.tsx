'use client';

import { useEffect, useState } from 'react';
import { Payment } from '../../domain/entities/payment.entity';
import { ListPaymentsUseCase } from '../../domain/use-cases/list-payments.use-case';
import { PaymentApiDataSource } from '../../data/datasources/payment.api.datasource';
import { PaymentRepositoryImpl } from '../../data/repositories/payment.repository.impl';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  verified: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'THB' }).format(amount);

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);

export default function PaymentListPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadPayments();
  }, [page, statusFilter]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const ds = new PaymentApiDataSource();
      const repo = new PaymentRepositoryImpl(ds);
      const result = await new ListPaymentsUseCase(repo).execute({
        page,
        limit: 10,
        status: statusFilter || undefined,
        search: search || undefined,
      });
      setPayments(result.data);
      setTotal(result.total);
    } catch {
      setError('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payments</h1>
        <a
          href="/payments/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          New Payment
        </a>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search payments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && loadPayments()}
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
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.paymentNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{payment.customerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formatCurrency(payment.amount)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{payment.paymentMethod}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(payment.paymentDate)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[payment.status] ?? 'bg-gray-100 text-gray-800'}`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {total > 10 && (
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
              <span className="text-sm text-gray-500">Total: {total} payments</span>
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
                  disabled={payments.length < 10}
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
