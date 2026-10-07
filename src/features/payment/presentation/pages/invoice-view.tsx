'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Invoice } from '../../domain/entities/payment.entity';
import { GenerateInvoiceUseCase } from '../../domain/use-cases/generate-invoice.use-case';
import { PaymentApiDataSource } from '../../data/datasources/payment.api.datasource';
import { PaymentRepositoryImpl } from '../../data/repositories/payment.repository.impl';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'THB' }).format(amount);

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);

export default function InvoiceViewPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!paymentId) {
      setError('No payment ID provided');
      setLoading(false);
      return;
    }
    loadInvoice();
  }, [paymentId]);

  const loadInvoice = async () => {
    try {
      setLoading(true);
      setError(null);
      const ds = new PaymentApiDataSource();
      const repo = new PaymentRepositoryImpl(ds);
      const result = await new GenerateInvoiceUseCase(repo).execute(paymentId!);
      setInvoice(result);
    } catch {
      setError('Failed to generate invoice');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  if (error) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (!invoice) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white shadow rounded-lg p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
            <p className="text-gray-600 mt-1">{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Status</p>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              {invoice.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Bill To</h3>
            <p className="text-gray-900 font-medium">{invoice.customerName}</p>
            <p className="text-gray-600 text-sm">Customer ID: {invoice.customerId}</p>
          </div>
          <div className="text-right">
            <div className="mb-2">
              <span className="text-sm text-gray-500">Issued: </span>
              <span className="text-sm text-gray-900">{formatDate(invoice.issuedDate)}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Due: </span>
              <span className="text-sm text-gray-900">{formatDate(invoice.dueDate)}</span>
            </div>
            {invoice.paidDate && (
              <div>
                <span className="text-sm text-gray-500">Paid: </span>
                <span className="text-sm text-gray-900">{formatDate(invoice.paidDate)}</span>
              </div>
            )}
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200 mb-6">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                <td className="px-4 py-3 text-sm text-gray-700 text-right">{item.quantity}</td>
                <td className="px-4 py-3 text-sm text-gray-700 text-right">{formatCurrency(item.unitPrice)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900">{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">VAT (7%)</span>
              <span className="text-gray-900">{formatCurrency(invoice.vat)}</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">{formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
