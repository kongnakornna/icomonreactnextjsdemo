'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Product } from '../../domain/entities/product.entity';
import { GetProductUseCase } from '../../domain/use-cases/get-product.use-case';
import { AdjustStockUseCase } from '../../domain/use-cases/adjust-stock.use-case';
import { InventoryApiDataSource } from '../../data/datasources/inventory.api.datasource';
import { InventoryRepositoryImpl } from '../../data/repositories/inventory.repository.impl';
import { useToast } from '@/app/_components/shared/toast-provider';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);

export default function StockAdjustmentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [adjustType, setAdjustType] = useState<'in' | 'out' | 'adjust'>('in');
  const [quantity, setQuantity] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const datasource = new InventoryApiDataSource();
      const repo = new InventoryRepositoryImpl(datasource);
      const result = await new GetProductUseCase(repo).execute(id);
      setProduct(result);
    } catch (err) {
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quantity || parseInt(quantity, 10) <= 0) {
      showToast('Please enter a valid quantity', 'error');
      return;
    }
    if (!note.trim()) {
      showToast('Please enter a note', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const datasource = new InventoryApiDataSource();
      const repo = new InventoryRepositoryImpl(datasource);
      const updated = await new AdjustStockUseCase(repo).execute(
        id,
        adjustType,
        parseInt(quantity, 10),
        note.trim(),
      );
      setProduct(updated);
      setQuantity('');
      setNote('');
      showToast('Stock adjusted successfully', 'success');
    } catch (err) {
      showToast('Failed to adjust stock', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!product) return <div className="text-gray-500 p-4">Product not found</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.push(`/inventory/products/${id}`)}
            className="text-sm text-blue-600 hover:text-blue-800 mb-1"
          >
            &larr; Back to product
          </button>
          <h1 className="text-2xl font-bold">Adjust Stock</h1>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Product Info</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Code:</span>
            <span className="ml-2 font-medium">{product.code}</span>
          </div>
          <div>
            <span className="text-gray-500">Name:</span>
            <span className="ml-2 font-medium">{product.name}</span>
          </div>
          <div>
            <span className="text-gray-500">Current Stock:</span>
            <span className="ml-2 font-bold text-lg">{product.currentStock} {product.unit}</span>
          </div>
          <div>
            <span className="text-gray-500">Minimum Stock:</span>
            <span className="ml-2 font-medium">{product.minimumStock} {product.unit}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-medium">Stock Adjustment</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Adjustment Type *</label>
          <div className="flex gap-3">
            {(['in', 'out', 'adjust'] as const).map((type) => (
              <label
                key={type}
                className={`flex-1 px-4 py-3 border-2 rounded-lg cursor-pointer text-center transition-colors ${
                  adjustType === type
                    ? type === 'in' ? 'border-green-500 bg-green-50 text-green-700'
                    : type === 'out' ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="adjustType"
                  value={type}
                  checked={adjustType === type}
                  onChange={(e) => setAdjustType(e.target.value as typeof adjustType)}
                  className="sr-only"
                />
                <span className="font-medium">
                  {type === 'in' ? 'Add Stock' : type === 'out' ? 'Remove Stock' : 'Set Stock'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity * {adjustType === 'adjust' && <span className="text-gray-400">(new stock level)</span>}
          </label>
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {quantity && adjustType !== 'adjust' && (
            <p className="mt-1 text-sm text-gray-500">
              Stock will be: {adjustType === 'in'
                ? product.currentStock + parseInt(quantity || '0', 10)
                : product.currentStock - parseInt(quantity || '0', 10)
              } {product.unit}
            </p>
          )}
          {quantity && adjustType === 'adjust' && (
            <p className="mt-1 text-sm text-gray-500">
              Stock will be set to: {parseInt(quantity || '0', 10)} {product.unit}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Note *</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Reason for adjustment..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push(`/inventory/products/${id}`)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {submitting ? 'Adjusting...' : 'Confirm Adjustment'}
          </button>
        </div>
      </form>
    </div>
  );
}
