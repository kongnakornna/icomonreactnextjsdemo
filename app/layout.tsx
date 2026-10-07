import type { Metadata } from 'next';
import './globals.scss';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/app/_components/utils';
import { ToastProvider } from './_components/shared/toast-provider';
import { I18nProvider } from '@/src/core/services/i18n.service';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'iCmon IoT',
  description: 'IoT Monitoring Dashboard',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var theme = localStorage.getItem('tabler-theme') || 'dark';
    var resolved = theme === 'system' ? 'dark' : theme;
    var el = document.documentElement;
    el.setAttribute('data-bs-theme', resolved);
    if (resolved === 'dark') {
      el.classList.add('dark');
    } else {
      el.classList.remove('dark');
    }
    var base = localStorage.getItem('tabler-themeBase') || 'gray';
    el.classList.remove('theme-slate','theme-gray','theme-zinc','theme-neutral','theme-stone');
    el.classList.add('theme-' + base);
    var primary = localStorage.getItem('tabler-themePrimary') || 'blue';
    el.setAttribute('data-bs-theme-primary', primary);
    var font = localStorage.getItem('tabler-themeFont') || 'sans-serif';
    el.setAttribute('data-bs-theme-font', font);
    var radius = localStorage.getItem('tabler-themeRadius') || '1';
    el.setAttribute('data-bs-theme-radius', radius);
    var lang = localStorage.getItem('icmon_language');
    if (lang) el.setAttribute('lang', lang);
  } catch(e) {}
})();
`,
          }}
        />
      </head>
      <body className={cn('min-h-screen font-sans antialiased', fontSans.variable)}>
        <I18nProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
