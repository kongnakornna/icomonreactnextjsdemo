'use client';

import { useEffect, useState } from 'react';
import { Location } from '../../domain/entities/settings.entity';
import { ListLocationsUseCase } from '../../domain/use-cases/location.use-cases';
import { SettingsApiDataSource } from '../../data/datasources/settings.api.datasource';
import { LocationRepositoryImpl } from '../../data/repositories/location.repository.impl';

export default function LocationListPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      setLoading(true);
      const datasource = new SettingsApiDataSource();
      const repository = new LocationRepositoryImpl(datasource);
      const useCase = new ListLocationsUseCase(repository);
      const result = await useCase.execute();
      setLocations(result.data);
    } catch (err) {
      console.error('Failed to load locations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Locations</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Add Location
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {locations.map((loc) => (
              <tr key={loc.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{loc.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{loc.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
