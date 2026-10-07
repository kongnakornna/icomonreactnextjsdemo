'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Customer } from '../../domain/entities/customer.entity';
import { GetCustomerUseCase } from '../../domain/use-cases/get-customer.use-case';
import { UpdateCustomerUseCase } from '../../domain/use-cases/update-customer.use-case';
import { CustomerApiDataSource } from '../../data/datasources/customer.api.datasource';
import { CustomerRepositoryImpl } from '../../data/repositories/customer.repository.impl';

export default function CustomerEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    loadCustomer();
  }, [id]);

  const loadCustomer = async () => {
    try {
      setLoading(true);
      const datasource = new CustomerApiDataSource();
      const repository = new CustomerRepositoryImpl(datasource);
      const useCase = new GetCustomerUseCase(repository);
      const result = await useCase.execute(id);
      if (!result) return;
      setCustomer(result);
      setFormData({
        companyName: result.companyName,
        email: result.email ?? '',
        phone: result.phone ?? '',
      });
    } catch (err) {
      setError('Failed to load customer');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      const datasource = new CustomerApiDataSource();
      const repository = new CustomerRepositoryImpl(datasource);
      const useCase = new UpdateCustomerUseCase(repository);
      await useCase.execute(id, formData);
      router.push(`/customers/${id}`);
    } catch (err) {
      setError('Failed to update customer');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!customer) {
    return <div className="text-red-500">Customer not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Customer</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.push(`/customers/${id}`)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
