import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import '../globals.scss';

const AuthExtras = dynamic(
  () => import('@/app/_components/auth/auth-extras').then((m) => m.AuthExtras),
  { ssr: false },
);

export const metadata: Metadata = {
  title: 'iCmon IoT - Authentication',
  description: 'IoT Monitoring Dashboard Login',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page page-center">
      <AuthExtras />
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="/" aria-label="Home">
            <img src="/img/logo/logo-light.png" height="28" alt="Logo" className="dark:hidden" />
            <img src="/img/logo/logo-dark.png" height="28" alt="Logo" className="hidden dark:block" />
          </a>
        </div>
        {children}
      </div>
    </div>
  );
}
