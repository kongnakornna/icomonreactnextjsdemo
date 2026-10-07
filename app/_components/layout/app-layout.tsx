'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="page">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="page-wrapper">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="page-body">
          <div className="container-xl">
            {children}
          </div>
        </div>
        <footer className="footer footer-transparent d-print-none">
          <div className="container-xl">
            <div className="row text-center align-items-center flex-row-reverse">
              <div className="col-lg-auto ms-lg-auto">
                <nav aria-label="Footer">
                  <ul className="list-inline list-inline-dots mb-0">
                    <li className="list-inline-item"><a href="#" className="link-secondary">About</a></li>
                    <li className="list-inline-item"><a href="#" className="link-secondary">Help</a></li>
                    <li className="list-inline-item"><a href="#" className="link-secondary">Privacy</a></li>
                  </ul>
                </nav>
              </div>
              <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                <ul className="list-inline list-inline-dots mb-0">
                  <li className="list-inline-item">
                    &copy; {new Date().getFullYear()}{' '}
                    <a href="/" className="link-secondary">iCmon</a>. All rights reserved.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
