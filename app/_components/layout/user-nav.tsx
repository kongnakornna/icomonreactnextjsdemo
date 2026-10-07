'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function UserNav() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('username');
    if (stored) setUsername(stored);
  }, []);

  const handleLogout = () => {
    const keys = Object.keys(localStorage);
    const tablerKeys: Record<string, string> = {};
    keys.forEach((k) => {
      if (k.startsWith('tabler-')) {
        tablerKeys[k] = localStorage.getItem(k) || '';
      }
    });
    localStorage.clear();
    Object.entries(tablerKeys).forEach(([k, v]) => localStorage.setItem(k, v));
    router.push('/sign-in');
  };

  return (
    <div className="nav-item dropdown">
      <button
        className="nav-link d-flex lh-1 p-0 px-2"
        data-bs-toggle="dropdown"
        aria-label="User menu"
      >
        <img
          src="/assets/img/avatars/avatar1.png"
          className="avatar avatar-sm"
          alt="Avatar"
        />
        <div className="d-none d-xl-block ps-2">
          <div>{username || 'User'}</div>
          <div className="mt-1 small text-secondary">User</div>
        </div>
      </button>
      <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
        <Link href="/user/profile" className="dropdown-item">
          Profile
        </Link>
        <Link href="/settings" className="dropdown-item">
          Settings & Privacy
        </Link>
        <div className="dropdown-divider"></div>
        <Link href="#" className="dropdown-item">
          Help
        </Link>
        <div className="dropdown-divider"></div>
        <button className="dropdown-item" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </div>
  );
}
