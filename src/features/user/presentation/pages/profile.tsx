'use client';

import { useEffect, useState } from 'react';
import { User } from '../../domain/entities/user.entity';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await fetch('/api/users/current');
      if (response.ok) {
        const data = await response.json();
        setUser({ ...data, createdAt: new Date(data.createdAt), updatedAt: new Date(data.updatedAt) });
      }
    } catch (err) {
      console.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (!user) return <div className="flex items-center justify-center h-64">User not found</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">{user.name.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">@{user.username}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm text-gray-900">{user.email}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-gray-500">Username</span>
            <span className="text-sm text-gray-900">{user.username}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-gray-500">Member Since</span>
            <span className="text-sm text-gray-900">{user.createdAt.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
