'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Product, StockMovement } from '../../domain/entities/product.entity';
import { GetProductUseCase } from '../../domain/use-cases/get-product.use-case';
import { GetStockMovementsUseCase } from '../../domain/use-cases/get-stock-movements.use-case';
import { InventoryApiDataSource } from '../../data/datasources/inventory.api.datasource';
import { InventoryRepositoryImpl } from '../../data/repositories/inventory.repository.impl';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(date);

const movementTypeLabel = (type: 'in' | 'out' | 'adjust') => {
  switch (type) {
    case 'in': return { text: 'Add', color: 'bg-green-100 text-green-800' };
    case 'out': return { text: 'Remove', color: 'bg-red-100 text-red-800' };
    case 'adjust': return { text: 'Adjust', color: 'bg-blue-100 text-blue-800' };
  }
};

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const datasource = new InventoryApiDataSource();
      const repo = new InventoryRepositoryImpl(datasource);
      const [productResult, movementsResult] = await Promise.all([
        new GetProductUseCase(repo).execute(id),
        new GetStockMovementsUseCase(repo).execute(id),
      ]);
      setProduct(productResult);
      setMovements(movementsResult);
    } catch (err) {
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!product) return <div className="text-gray-500 p-4">Product not found</div>;

  const stockColor =
    product.currentStock <= 0 ? 'text-red-600' :
    product.currentStock <= product.minimumStock ? 'text-orange-500' :
    'text-green-600';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={() => router.back()} className="text-sm text-blue-600 hover:text-blue-800 mb-1">
            &larr; Back to products
          </button>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.code}</p>
        </div>
        <button
          onClick={() => router.push(`/inventory/products/${id}/adjust`)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Adjust Stock
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 md:col-span-2">
          <h2 className="text-lg font-medium mb-4">Product Information</h2>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Code</dt>
              <dd className="text-sm font-medium">{product.code}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Category</dt>
              <dd className="text-sm font-medium">{product.categoryName}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Unit</dt>
              <dd className="text-sm font-medium">{product.unit}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Barcode</dt>
              <dd className="text-sm font-medium">{product.barcode ?? 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Price</dt>
              <dd className="text-sm font-medium">{formatCurrency(product.price)}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Cost</dt>
              <dd className="text-sm font-medium">{formatCurrency(product.cost)}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Status</dt>
              <dd>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.isActive ? 'Active' : 'Inactive'}
                </span>
              </dd>
            </div>
            {product.description && (
              <div className="col-span-2">
                <dt className="text-sm text-gray-500">Description</dt>
                <dd className="text-sm">{product.description}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Stock Level</h2>
          <div className="text-center">
            <p className={`text-4xl font-bold ${stockColor}`}>{product.currentStock}</p>
            <p className="text-sm text-gray-500 mt-1">{product.unit}</p>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-500">Minimum stock</p>
              <p className="text-lg font-medium">{product.minimumStock} {product.unit}</p>
            </div>
            {product.currentStock <= product.minimumStock && (
              <div className="mt-3 px-3 py-2 bg-orange-50 border border-orange-200 rounded text-sm text-orange-700">
                {product.currentStock <= 0 ? 'Out of stock!' : 'Low stock warning'}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Stock Movements</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Before</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">After</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">By</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movements.map((m) => {
              const label = movementTypeLabel(m.type);
              return (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{formatDate(m.createdAt)}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${label.color}`}>{label.text}</span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-right font-medium">
                    {m.type === 'out' ? '-' : '+'}{m.quantity}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{m.beforeStock}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-right">{m.afterStock}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{m.reference}</td>
                  <td className="px-6 py-3 text-sm text-gray-500 max-w-[200px] truncate">{m.note}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{m.createdBy}</td>
                </tr>
              );
            })}
            {movements.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">No stock movements recorded</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
