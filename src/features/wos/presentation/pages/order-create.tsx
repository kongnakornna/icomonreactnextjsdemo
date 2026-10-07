'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OrderChannel, CreateOrderItemInput } from '../../domain/entities/web-order.entity';
import { CreateWebOrderUseCase } from '../../domain/use-cases/create-web-order.use-case';
import { WebOrderApiDataSource } from '../../data/datasources/web-order.api.datasource';
import { WebOrderRepositoryImpl } from '../../data/repositories/web-order.repository.impl';
import { useToast } from '@/app/_components/shared/toast-provider';

export default function OrderCreatePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [channel, setChannel] = useState<OrderChannel>('website');
  const [shippingAddress, setShippingAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<CreateOrderItemInput[]>([
    { productId: '', productName: '', quantity: 1, unitPrice: 0 },
  ]);

  const addItem = () => {
    setItems([...items, { productId: '', productName: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof CreateOrderItemInput, value: string | number) => {
    const updated = [...items];
    if (field === 'quantity' || field === 'unitPrice') {
      (updated[index] as unknown as Record<string, unknown>)[field] = typeof value === 'string' ? parseFloat(value) || 0 : value;
    } else {
      (updated[index] as unknown as Record<string, unknown>)[field] = value;
    }
    setItems(updated);
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const shippingCost = 0;
  const vat = subtotal * 0.07;
  const total = subtotal + shippingCost + vat;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !shippingAddress) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    if (items.some(i => !i.productId || !i.productName || i.quantity <= 0 || i.unitPrice <= 0)) {
      showToast('Please fill in all item details correctly', 'error');
      return;
    }

    try {
      setLoading(true);
      const datasource = new WebOrderApiDataSource();
      const repo = new WebOrderRepositoryImpl(datasource);
      await new CreateWebOrderUseCase(repo).execute({
        customerName,
        customerEmail,
        channel,
        items: items.map(i => ({
          ...i,
          total: i.quantity * i.unitPrice,
        })),
        shippingAddress,
        notes: notes || undefined,
      });
      showToast('Order created successfully', 'success');
      router.push('/wos/orders');
    } catch (err) {
      showToast('Failed to create order', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create Order</h1>
        <button onClick={() => router.back()} className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-medium">Customer Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Channel *</label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as OrderChannel)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="facebook">Facebook</option>
              <option value="line">LINE</option>
              <option value="shopee">Shopee</option>
              <option value="lazada">Lazada</option>
              <option value="website">Website</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address *</label>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Order Items</h2>
            <button
              type="button"
              onClick={addItem}
              className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
            >
              + Add Item
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg bg-gray-50">
                <div className="flex-1 grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Product ID *</label>
                    <input
                      type="text"
                      value={item.productId}
                      onChange={(e) => updateItem(index, 'productId', e.target.value)}
                      className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Product Name *</label>
                    <input
                      type="text"
                      value={item.productName}
                      onChange={(e) => updateItem(index, 'productName', e.target.value)}
                      className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Qty *</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                      className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Unit Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.unitPrice || ''}
                      onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                      className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="pt-5">
                  <span className="text-sm font-medium text-gray-700">
                    {formatCurrency(item.quantity * item.unitPrice)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  disabled={items.length <= 1}
                  className="mt-4 text-red-500 hover:text-red-700 disabled:opacity-30 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">VAT (7%)</span>
              <span className="font-medium">{formatCurrency(vat)}</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t pt-2">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Optional order notes..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
