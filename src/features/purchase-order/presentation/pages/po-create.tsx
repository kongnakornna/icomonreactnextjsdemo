'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { POItem } from '../../domain/entities/purchase-order.entity';
import { CreatePurchaseOrderUseCase } from '../../domain/use-cases/create-purchase-order.use-case';
import { PurchaseOrderApiDataSource } from '../../data/datasources/purchase-order.api.datasource';
import { PurchaseOrderRepositoryImpl } from '../../data/repositories/purchase-order.repository.impl';

interface ItemForm {
  productId: string;
  productName: string;
  quantity: string;
  unitPrice: string;
}

const emptyItem = (): ItemForm => ({
  productId: '',
  productName: '',
  quantity: '1',
  unitPrice: '0',
});

const calcItemTotal = (item: ItemForm) =>
  (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0);

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'THB' }).format(amount);

export default function POCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supplierName, setSupplierName] = useState('');
  const [expectedDelivery, setExpectedDelivery] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<ItemForm[]>([emptyItem()]);

  const updateItem = (index: number, field: keyof ItemForm, value: string) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const addItem = () => setItems((prev) => [...prev, emptyItem()]);

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + calcItemTotal(item), 0);
  const vat = subtotal * 0.07;
  const total = subtotal + vat;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplierName || items.length === 0) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const ds = new PurchaseOrderApiDataSource();
      const repo = new PurchaseOrderRepositoryImpl(ds);
      const poItems: POItem[] = items.map((item, index) => ({
        id: `item-${index}`,
        productId: item.productId,
        productName: item.productName,
        quantity: parseFloat(item.quantity) || 0,
        unitPrice: parseFloat(item.unitPrice) || 0,
        total: calcItemTotal(item),
      }));
      await new CreatePurchaseOrderUseCase(repo).execute({
        poNumber: `PO-${Date.now()}`,
        supplierName,
        items: poItems,
        subtotal,
        vat,
        total,
        expectedDelivery: expectedDelivery ? new Date(expectedDelivery) : undefined,
        notes: notes || undefined,
        createdBy: 'current-user',
      });
      router.push('/purchase-orders');
    } catch {
      setError('Failed to create purchase order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Create Purchase Order</h1>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-medium">Order Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name *</label>
              <input
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery</label>
              <input
                type="date"
                value={expectedDelivery}
                onChange={(e) => setExpectedDelivery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Items</h2>
            <button
              type="button"
              onClick={addItem}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + Add Item
            </button>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={item.productId}
                      onChange={(e) => updateItem(index, 'productId', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={item.productName}
                      onChange={(e) => updateItem(index, 'productName', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                      min="0"
                      className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                      min="0"
                      step="0.01"
                      className="w-28 border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 font-medium">
                    {formatCurrency(calcItemTotal(item))}
                  </td>
                  <td className="px-4 py-2">
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">VAT (7%)</span>
                <span className="text-gray-900">{formatCurrency(vat)}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Purchase Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
