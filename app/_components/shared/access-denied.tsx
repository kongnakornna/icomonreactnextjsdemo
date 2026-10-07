'use client';

import Link from 'next/link';
import { Button } from '@/app/_components/ui/button';

export function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">403</h1>
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Access Denied
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        You do not have permission to access this page.
      </p>
      <Link href="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
}
