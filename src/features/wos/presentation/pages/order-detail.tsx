'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { WebOrder, OrderStatus } from '../../domain/entities/web-order.entity';
import { GetWebOrderUseCase } from '../../domain/use-cases/get-web-order.use-case';
import { CancelWebOrderUseCase } from '../../domain/use-cases/cancel-web-order.use-case';
import { WebOrderApiDataSource } from '../../data/datasources/web-order.api.datasource';
import { WebOrderRepositoryImpl } from '../../data/repositories/web-order.repository.impl';
import { useToast } from '@/app/_components/shared/toast-provider';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(date);

const statusConfig: Record<OrderStatus, { label: string; color: string; step: number }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', step: 1 },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800', step: 2 },
  shipping: { label: 'Shipping', color: 'bg-purple-100 text-purple-800', step: 3 },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800', step: 4 },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', step: -1 },
};

const statusTimeline: { status: OrderStatus; label: string; step: number }[] = [
  { status: 'pending', label: 'Pending', step: 1 },
  { status: 'confirmed', label: 'Confirmed', step: 2 },
  { status: 'shipping', label: 'Shipping', step: 3 },
  { status: 'delivered', label: 'Delivered', step: 4 },
];

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { showToast } = useToast();

  const [order, setOrder] = useState<WebOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const datasource = new WebOrderApiDataSource();
      const repo = new WebOrderRepositoryImpl(datasource);
      const result = await new GetWebOrderUseCase(repo).execute(id);
      setOrder(result);
    } catch (err) {
      setError('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    try {
      setCancelling(true);
      const datasource = new WebOrderApiDataSource();
      const repo = new WebOrderRepositoryImpl(datasource);
      const updated = await new CancelWebOrderUseCase(repo).execute(id);
      setOrder(updated);
      showToast('Order cancelled', 'success');
    } catch (err) {
      showToast('Failed to cancel order', 'error');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!order) return <div className="text-gray-500 p-4">Order not found</div>;

  const currentStatus = statusConfig[order.status] ?? { label: order.status, color: 'bg-gray-100 text-gray-800', step: 0 };
  const currentStep = currentStatus.step;
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={() => router.push('/wos/orders')} className="text-sm text-blue-600 hover:text-blue-800 mb-1">
            &larr; Back to orders
          </button>
          <h1 className="text-2xl font-bold">Order {order.orderNumber}</h1>
        </div>
        {!isCancelled && (
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
          >
            {cancelling ? 'Cancelling...' : 'Cancel Order'}
          </button>
        )}
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 text-sm rounded-full font-medium ${currentStatus.color}`}>
          {currentStatus.label}
        </span>
        {order.trackingNumber && (
          <span className="text-sm text-gray-500">Tracking: {order.trackingNumber}</span>
        )}
      </div>

      {/* Status Timeline */}
      {!isCancelled && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Order Status</h2>
          <div className="flex items-center justify-between">
            {statusTimeline.map((s, i) => {
              const isActive = currentStep >= s.step;
              const isCurrent = currentStep === s.step;
              return (
                <div key={s.status} className="flex-1 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCurrent ? 'bg-blue-500 text-white ring-2 ring-blue-200' :
                    isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s.step}
                  </div>
                  <span className={`mt-2 text-xs ${isActive ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                  {i < statusTimeline.length - 1 && (
                    <div className={`absolute h-0.5 w-full ${
                      currentStep > s.step ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Customer</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Name</dt>
              <dd className="font-medium">{order.customerName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Email</dt>
              <dd className="font-medium">{order.customerEmail}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Channel</dt>
              <dd className="font-medium capitalize">{order.channel}</dd>
            </div>
          </dl>
        </div>

        {/* Shipping Info */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Shipping</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-gray-500">Address</dt>
              <dd className="font-medium mt-1">{order.shippingAddress}</dd>
            </div>
            {order.trackingNumber && (
              <div className="flex justify-between mt-3">
                <dt className="text-gray-500">Tracking #</dt>
                <dd className="font-medium">{order.trackingNumber}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Items</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order.items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">{item.productName}</td>
                <td className="px-6 py-3 text-sm text-gray-500 text-right">{item.quantity}</td>
                <td className="px-6 py-3 text-sm text-gray-500 text-right">{formatCurrency(item.unitPrice)}</td>
                <td className="px-6 py-3 text-sm font-medium text-right">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={3} className="px-6 py-3 text-sm text-gray-500 text-right">Subtotal</td>
              <td className="px-6 py-3 text-sm font-medium text-right">{formatCurrency(order.subtotal)}</td>
            </tr>
            <tr>
              <td colSpan={3} className="px-6 py-3 text-sm text-gray-500 text-right">VAT (7%)</td>
              <td className="px-6 py-3 text-sm font-medium text-right">{formatCurrency(order.vat)}</td>
            </tr>
            <tr>
              <td colSpan={3} className="px-6 py-3 text-sm text-gray-500 text-right">Shipping</td>
              <td className="px-6 py-3 text-sm font-medium text-right">{formatCurrency(order.shippingCost)}</td>
            </tr>
            <tr className="border-t-2 border-gray-300">
              <td colSpan={3} className="px-6 py-3 text-base font-bold text-right">Total</td>
              <td className="px-6 py-3 text-base font-bold text-right">{formatCurrency(order.total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-2">Notes</h2>
          <p className="text-sm text-gray-600">{order.notes}</p>
        </div>
      )}

      {/* Dates */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-2">Timeline</h2>
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Created</dt>
            <dd>{formatDate(order.createdAt)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Last Updated</dt>
            <dd>{formatDate(order.updatedAt)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
