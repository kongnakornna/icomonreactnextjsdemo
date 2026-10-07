'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { UserNav } from './user-nav';
import { LanguageSelector } from '@/app/_components/auth/language-selector';
import { useTheme } from '@/src/core/services/theme.service';
import { useI18n } from '@/src/core/services/i18n.service';
import {
  Bell, LayoutGrid, Moon, Sun, Settings, Maximize, Minimize,
  LayoutDashboard, Users, FileText, ShoppingCart, Package, CreditCard,
  Folder, Mail, Layers, Cpu, Monitor, Radio, Workflow, ClipboardList,
  Briefcase, Home, Activity, BarChart3, Bot, UserCog, Globe,
} from 'lucide-react';

const APP_LINKS = [
  { label: 'Dashboard', icon: LayoutDashboard, route: '/dashboard' },
  { label: 'Customers', icon: Users, route: '/customers' },
  { label: 'Quotations', icon: FileText, route: '/quotations' },
  { label: 'Purchase Orders', icon: ShoppingCart, route: '/purchase-orders' },
  { label: 'Products', icon: Package, route: '/products' },
  { label: 'Payments', icon: CreditCard, route: '/payments' },
  { label: 'Documents', icon: Folder, route: '/documents' },
  { label: 'Job Cards', icon: Briefcase, route: '/jobs' },
  { label: 'Work Orders', icon: ClipboardList, route: '/wos/orders' },
  { label: 'IoT Devices', icon: Cpu, route: '/iot/devices' },
  { label: 'MQTT Dashboard', icon: Radio, route: '/mqtt/dashboard' },
  { label: 'MQTT Flows', icon: Workflow, route: '/mqtt/flows' },
  { label: 'Analytics', icon: BarChart3, route: '/ai-analytics' },
  { label: 'Reports', icon: BarChart3, route: '/reports/schedule' },
  { label: 'Email', icon: Mail, route: '/email/templates' },
  { label: 'Monitoring', icon: Monitor, route: '/monitoring/smarthome' },
  { label: 'Users', icon: UserCog, route: '/user/listdata' },
  { label: 'AI Chatbot', icon: Bot, route: '/ai-chatbot' },
];

const NOTIFICATIONS = [
  { id: 1, title: 'New device connected', time: '2 minutes ago', read: false },
  { id: 2, title: 'Alarm triggered: Temperature high', time: '15 minutes ago', read: false },
  { id: 3, title: 'Scheduled task completed', time: '1 hour ago', read: true },
];

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { settings, update } = useTheme();
  const { t } = useI18n();
  const [unreadCount, setUnreadCount] = useState(
    NOTIFICATIONS.filter((n) => !n.read).length
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="navbar navbar-expand-md d-print-none">
      <div className="container-xl">
        <button
          className="navbar-toggler"
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-brand navbar-brand-autodark pe-0 pe-md-3">
          <Link href="/dashboard" aria-label="Home">
            <img
              src="/assets/img/logo/logo-light.png"
              className="navbar-brand-image dark:hidden"
              alt="Logo"
            />
            <img
              src="/assets/img/logo/logo-dark.png"
              className="navbar-brand-image hidden dark:block"
              alt="Logo"
            />
          </Link>
        </div>

        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-item d-none d-md-flex me-3">
            <div className="nav-item dropdown d-none d-md-flex">
              <button
                className="nav-link px-0"
                data-bs-toggle="dropdown"
                tabIndex={-1}
                aria-label="Notifications"
              >
                <Bell className="icon icon-sm" />
                {unreadCount > 0 && (
                  <span className="badge bg-red">{unreadCount}</span>
                )}
              </button>
              <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                <div className="card">
                  <div className="card-header d-flex">
                    <h3 className="card-title">Notifications</h3>
                    <div
                      className="btn-close ms-auto"
                      data-bs-dismiss="dropdown"
                    ></div>
                  </div>
                  <div className="list-group list-group-flush list-group-hoverable">
                    {NOTIFICATIONS.map((n) => (
                      <div key={n.id} className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span
                              className={`status-dot d-block ${!n.read ? 'status-dot-animated bg-red' : ''}`}
                            ></span>
                          </div>
                          <div className="col text-truncate">
                            <a href="#" className="text-body d-block">
                              {n.title}
                            </a>
                            <div className="d-block text-secondary text-truncate mt-n1">
                              {n.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <button
                          className="btn btn-outline-secondary w-100"
                          onClick={() => setUnreadCount(0)}
                        >
                          Archive all
                        </button>
                      </div>
                      <div className="col">
                        <button
                          className="btn btn-outline-secondary w-100"
                          onClick={() => setUnreadCount(0)}
                        >
                          Mark all read
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="nav-item dropdown d-none d-md-flex">
            <button
              className="nav-link px-0"
              data-bs-toggle="dropdown"
              tabIndex={-1}
              aria-label="Apps"
            >
              <LayoutGrid className="icon icon-sm" />
            </button>
            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Apps</div>
                </div>
                <div className="card-body scroll-y p-2" style={{ maxHeight: '50vh' }}>
                  <div className="row g-0">
                    {APP_LINKS.map((app) => (
                      <div key={app.label} className="col-4">
                        <Link
                          href={app.route}
                          className="d-flex flex-column align-items-center justify-content-center text-center text-secondary py-2 px-2 link-hoverable"
                        >
                          <app.icon className="icon icon-md mx-auto mb-2" />
                          <span className="h5">{app.label}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="nav-item">
            <ThemeToggle />
          </div>

          <div className="nav-item dropdown d-none d-md-flex">
            <button
              className="nav-link px-0 layout-toggle"
              data-bs-toggle="dropdown"
              tabIndex={-1}
              aria-label="Layout"
            >
              <Settings className="icon icon-sm" />
            </button>
            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
              <div className="card">
                <div className="list-group list-group-flush list-group-hoverable">
                  <div className={`list-group-item ${settings.layout === 'fluid' ? 'active' : ''}`}>
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <button
                          className="list-group-item-actions"
                          onClick={() => update('layout', 'fluid')}
                        >
                          Fluid
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={`list-group-item ${settings.layout === 'boxed' ? 'active' : ''}`}>
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <button
                          className="list-group-item-actions"
                          onClick={() => update('layout', 'boxed')}
                        >
                          Boxed
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={`list-group-item ${settings.layout === 'boxed-2' ? 'active' : ''}`}>
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <button
                          className="list-group-item-actions"
                          onClick={() => update('layout', 'boxed-2')}
                        >
                          Boxed 2
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <button
                          className="list-group-item-actions"
                          onClick={toggleFullscreen}
                        >
                          {isFullscreen ? (
                            <Minimize className="icon" />
                          ) : (
                            <Maximize className="icon" />
                          )}
                          {' '}Fullscreen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="nav-item">
            <UserNav />
          </div>

          <div className="nav-item">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
