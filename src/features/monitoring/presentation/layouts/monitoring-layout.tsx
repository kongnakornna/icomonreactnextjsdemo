'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building2, Activity, Factory, Sun } from 'lucide-react';

const navItems = [
  { href: '/monitoring/smarthome', label: 'Smart Home', icon: Home },
  { href: '/monitoring/smartcity', label: 'Smart City', icon: Building2 },
  { href: '/monitoring/smartmonitor', label: 'Smart Monitor', icon: Activity },
  { href: '/monitoring/industry', label: 'Industry', icon: Factory },
  { href: '/monitoring/smartsolarfarm', label: 'Smart Solar Farm', icon: Sun },
];

export default function MonitoringLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full">
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Monitoring</h2>
          <p className="text-xs text-gray-500 mt-1">IoT Dashboard Overview</p>
        </div>
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}
