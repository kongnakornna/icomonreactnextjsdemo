'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Customer } from '../../domain/entities/customer.entity';
import { GetCustomerUseCase } from '../../domain/use-cases/get-customer.use-case';
import { DeleteCustomerUseCase } from '../../domain/use-cases/delete-customer.use-case';
import { CustomerApiDataSource } from '../../data/datasources/customer.api.datasource';
import { CustomerRepositoryImpl } from '../../data/repositories/customer.repository.impl';

export default function CustomerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setCustomer(result ?? null);
    } catch (err) {
      setError('Failed to load customer');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this customer?')) {
      return;
    }

    try {
      const datasource = new CustomerApiDataSource();
      const repository = new CustomerRepositoryImpl(datasource);
      const useCase = new DeleteCustomerUseCase(repository);
      await useCase.execute(id);
      router.push('/customers');
    } catch (err) {
      setError('Failed to delete customer');
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{customer.companyName}</h1>
        <div className="space-x-2">
          <button
            onClick={() => router.push(`/customers/${id}/edit`)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{customer.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-gray-900">{customer.phone}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(customer.createdAt).toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Updated At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(customer.updatedAt).toLocaleDateString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
