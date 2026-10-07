'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MENU_CONFIG } from '@/src/core/config/menu.config';
import type { MenuItem } from '@/src/core/config/menu.config';
import { LanguageSelector } from '@/app/_components/auth/language-selector';
import {
  LayoutDashboard, Users, FileText, ShoppingCart, Package, CreditCard,
  Folder, Mail, Layers, Cpu, Monitor, Radio, Workflow, ClipboardList,
  Briefcase, Eye, Home, Building2, Activity, Factory, Sun,
  BarChart3, Bot, UserCog, Settings, ChevronDown, X,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Users, FileText, ShoppingCart, Package, CreditCard,
  Folder, Mail, Layers, Cpu, Monitor, Radio, Workflow, ClipboardList,
  Briefcase, Eye, Home, Building2, Activity, Factory, Sun,
  BarChart3, Bot, UserCog, Settings,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  const toggleSubmenu = (id: string) => {
    setExpandedMenus((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isChildActive = (item: MenuItem): boolean => {
    if (item.href && pathname.startsWith(item.href)) return true;
    return item.children?.some(isChildActive) ?? false;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`navbar navbar-vertical navbar-expand-lg${isOpen ? ' show' : ''}`}
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebar-menu"
            aria-controls="sidebar-menu"
            aria-expanded="false"
            aria-label="Toggle sidebar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-brand navbar-brand-autodark">
            <Link href="/dashboard" aria-label="iCmon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="navbar-brand-image"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 21l4 -4" />
                <path d="M21 3l-4 4" />
                <path d="M6 12a4 4 0 0 1 4 -4h8" />
                <path d="M15 12a4 4 0 0 1 -4 4h-4" />
              </svg>
            </Link>
            iCmon
          </div>

          <div className="navbar-nav flex-row d-lg-none">
            <LanguageSelector />
          </div>

          <div className="collapse navbar-collapse" id="sidebar-menu">
            <ul className="navbar-nav pt-lg-3">
              {MENU_CONFIG.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  expandedMenus={expandedMenus}
                  toggleSubmenu={toggleSubmenu}
                  isChildActive={isChildActive}
                  onClose={onClose}
                />
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({
  item,
  pathname,
  expandedMenus,
  toggleSubmenu,
  isChildActive,
  onClose,
}: {
  item: MenuItem;
  pathname: string;
  expandedMenus: Set<string>;
  toggleSubmenu: (id: string) => void;
  isChildActive: (item: MenuItem) => boolean;
  onClose: () => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href ? pathname.startsWith(item.href) : false;
  const active = isActive || isChildActive(item);
  const expanded = expandedMenus.has(item.id) || active;
  const Icon = item.icon ? ICON_MAP[item.icon] : null;

  if (hasChildren) {
    return (
      <li className="nav-item dropdown">
        <button
          onClick={() => toggleSubmenu(item.id)}
          className={`nav-link dropdown-toggle${expanded ? ' active' : ''}`}
          aria-expanded={expanded}
        >
          {Icon && (
            <span className="nav-link-icon d-md-none d-lg-inline-block">
              <Icon className="icon" />
            </span>
          )}
          <span className="nav-link-title">{item.label}</span>
        </button>
        <div className={`dropdown-menu${expanded ? ' show' : ''}`}>
          {item.children!.map((child) => (
            <SidebarChildItem
              key={child.id}
              item={child}
              pathname={pathname}
              expandedMenus={expandedMenus}
              toggleSubmenu={toggleSubmenu}
              onClose={onClose}
            />
          ))}
        </div>
      </li>
    );
  }

  return (
    <li className={`nav-item${isActive ? ' active' : ''}`}>
      <Link
        href={item.href || '#'}
        onClick={onClose}
        className="nav-link"
      >
        {Icon && (
          <span className="nav-link-icon d-md-none d-lg-inline-block">
            <Icon className="icon" />
          </span>
        )}
        <span className="nav-link-title">{item.label}</span>
      </Link>
    </li>
  );
}

function SidebarChildItem({
  item,
  pathname,
  expandedMenus,
  toggleSubmenu,
  onClose,
}: {
  item: MenuItem;
  pathname: string;
  expandedMenus: Set<string>;
  toggleSubmenu: (id: string) => void;
  onClose: () => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href ? pathname === item.href : false;
  const expanded = expandedMenus.has(item.id) || isActive;
  const Icon = item.icon ? ICON_MAP[item.icon] : null;

  if (hasChildren) {
    return (
      <li className="dropend">
        <button
          onClick={() => toggleSubmenu(item.id)}
          className="dropdown-item dropdown-toggle"
          aria-expanded={expanded}
        >
          {Icon && <Icon className="icon-inline me-1" />}
          {item.label}
        </button>
        <div className={`dropdown-menu${expanded ? ' show' : ''}`}>
          {item.children!.map((child) => (
            <SidebarChildItem
              key={child.id}
              item={child}
              pathname={pathname}
              expandedMenus={expandedMenus}
              toggleSubmenu={toggleSubmenu}
              onClose={onClose}
            />
          ))}
        </div>
      </li>
    );
  }

  return (
    <Link
      href={item.href || '#'}
      onClick={onClose}
      className={`dropdown-item${isActive ? ' active' : ''}`}
    >
      {Icon && <Icon className="icon-inline me-1" />}
      {item.label}
    </Link>
  );
}
