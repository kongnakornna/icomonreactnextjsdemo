# Theme Migration Guide - Angular to React

## สารบัญ

1. [Overview](#overview)
2. [Angular Theme System](#angular-theme-system)
3. [React Theme System](#react-theme-system)
4. [CSS Variables Migration](#css-variables-migration)
5. [Component Migration](#component-migration)
6. [Theme Settings Page](#theme-settings-page)

---

## Overview

This document details the migration of the theme system from Angular (Tabler-based) to React/Next.js (Tailwind + shadcn/ui).

### Key Differences

| Aspect | Angular | React/Next.js |
|--------|---------|---------------|
| CSS Framework | Tabler SCSS | Tailwind CSS |
| UI Components | Tabler components | shadcn/ui |
| State Management | Signals | React State/Hooks |
| Theme Provider | LayoutService | next-themes |
| Dark Mode | `data-bs-theme` attribute | CSS variables + class |

---

## Angular Theme System

### State Management

```typescript
// src/app/core/services/layout.service.ts
@Injectable({ providedIn: 'root' })
export class LayoutService {
  private _state = signal<LayoutSettings>({
    theme: 'dark',
    themeBase: 'gray',
    themeFont: 'sans-serif',
    themePrimary: 'blue',
    themeRadius: '1',
    layout: 'fluid',
  });

  state = this._state.asReadonly();

  update(key: keyof LayoutSettings, value: string) {
    this._state.update(s => ({ ...s, [key]: value }));
    this.saveSettings();
    this.applySettings();
  }

  private saveSettings() {
    const state = this._state();
    localStorage.setItem('tabler-theme', state.theme);
    localStorage.setItem('tabler-theme-base', state.themeBase);
    localStorage.setItem('tabler-theme-font', state.themeFont);
    localStorage.setItem('tabler-theme-primary', state.themePrimary);
    localStorage.setItem('tabler-theme-radius', state.themeRadius);
  }

  private applySettings() {
    const state = this._state();
    const el = document.documentElement;
    
    el.setAttribute('data-bs-theme', state.theme);
    el.setAttribute('data-bs-theme-base', state.themeBase);
    el.setAttribute('data-bs-theme-font', state.themeFont);
    el.setAttribute('data-bs-theme-primary', state.themePrimary);
    el.setAttribute('data-bs-theme-radius', state.themeRadius);
    
    // Update classes
    el.classList.remove('theme-slate', 'theme-gray', 'theme-zinc', 'theme-neutral', 'theme-stone');
    el.classList.add('theme-' + state.themeBase);
  }
}
```

### CSS Setup

```scss
// src/styles.scss
@use '@tabler/core/scss/tabler';
@use '@tabler/core/scss/tabler-themes';
@use 'assets/tabler/scss/custom/utilities';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Theme Settings Component

```typescript
// src/app/layouts/layout-settings/layout-settings.component.ts
@Component({
  selector: 'app-layout-settings',
  templateUrl: './layout-settings.component.html',
})
export class LayoutSettingsComponent {
  layoutService = inject(LayoutService);
  
  themes = ['light', 'dark'];
  bases = ['gray', 'slate', 'zinc', 'neutral', 'stone'];
  fonts = ['sans-serif', 'serif', 'monospace'];
  primaries = ['blue', 'green', 'red', 'yellow', 'purple'];
  radiuses = ['0', '1', '2', '3', '4'];
  
  update(key: string, value: string) {
    this.layoutService.update(key, value);
  }
}
```

---

## React Theme System

### Theme Service (Hook)

```typescript
// src/core/services/theme.service.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

interface ThemeSettings {
  theme: 'light' | 'dark';
  themeBase: string;
  themeFont: string;
  themePrimary: string;
  themeRadius: string;
  layout: 'fluid' | 'boxed' | 'boxed-2';
}

const STORAGE_PREFIX = 'tabler-';
const DEFAULTS: ThemeSettings = {
  theme: 'dark',
  themeBase: 'gray',
  themeFont: 'sans-serif',
  themePrimary: 'blue',
  themeRadius: '1',
  layout: 'fluid',
};

export function useTheme() {
  const [settings, setSettings] = useState<ThemeSettings>(DEFAULTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const loaded = { ...DEFAULTS };
    for (const key of Object.keys(DEFAULTS) as (keyof ThemeSettings)[]) {
      const stored = localStorage.getItem(STORAGE_PREFIX + key);
      if (stored) {
        (loaded as any)[key] = stored;
      }
    }
    setSettings(loaded);
    applySettings(loaded);
    setIsLoaded(true);
  }, []);

  const update = useCallback((key: keyof ThemeSettings, value: string) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem(STORAGE_PREFIX + key, value);
      applySettings(newSettings);
      return newSettings;
    });
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULTS);
    for (const key of Object.keys(DEFAULTS)) {
      localStorage.removeItem(STORAGE_PREFIX + key);
    }
    applySettings(DEFAULTS);
  }, []);

  return { settings, update, reset, isLoaded };
}

function applySettings(s: ThemeSettings) {
  const el = document.documentElement;
  
  // Tabler attributes
  el.setAttribute('data-bs-theme', s.theme);
  el.setAttribute('data-bs-theme-base', s.themeBase);
  el.setAttribute('data-bs-theme-font', s.themeFont);
  el.setAttribute('data-bs-theme-primary', s.themePrimary);
  el.setAttribute('data-bs-theme-radius', s.themeRadius);

  // Theme base classes
  el.classList.remove('theme-slate', 'theme-gray', 'theme-zinc', 'theme-neutral', 'theme-stone');
  el.classList.add('theme-' + s.themeBase);

  // Layout classes
  const body = document.body;
  body.classList.remove('layout-fluid', 'layout-boxed', 'layout-boxed-2');
  if (s.layout === 'boxed' || s.layout === 'boxed-2') {
    body.classList.add('layout-boxed');
    if (s.layout === 'boxed-2') body.classList.add('layout-boxed-2');
  }
}
```

### Theme Provider

```typescript
// app/_components/theme-provider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### Root Layout

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/app/_components/utils';
import { ThemeProvider } from './_components/theme-provider';
import { Toaster } from './_components/ui/sonner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'ICMon Web App',
  description: 'IoT Monitoring Dashboard',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
```

---

## CSS Variables Migration

### Angular (Tabler)

```css
/* Tabler uses data-bs-theme attributes */
[data-bs-theme="dark"] {
  --tblr-body-bg: #1a1d21;
  --tblr-body-color: #e6e7eb;
}

[data-bs-theme="light"] {
  --tblr-body-bg: #fff;
  --tblr-body-color: #1a1d21;
}
```

### React (Tailwind + shadcn/ui)

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  :root[class~='dark'] {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

### Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  corePlugins: {
    visibility: false, // Disable to avoid collision with Bootstrap
  },
};

export default config;
```

---

## Component Migration

### Theme Toggle Component

```tsx
// app/_components/layout/theme-toggle.tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import { useTheme } from '@/src/core/services/theme.service';

export function ThemeToggle() {
  const { settings, update } = useTheme();

  const toggleTheme = () => {
    update('theme', settings.theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

### Theme Settings Component

```tsx
// app/_components/layout/theme-settings.tsx
'use client';

import { useTheme } from '@/src/core/services/theme.service';
import { Button } from '@/app/_components/ui/button';
import { Label } from '@/app/_components/ui/label';
import { Separator } from '@/app/_components/ui/separator';

const themes = ['light', 'dark'];
const bases = ['gray', 'slate', 'zinc', 'neutral', 'stone'];
const fonts = ['sans-serif', 'serif', 'monospace'];
const primaries = ['blue', 'green', 'red', 'yellow', 'purple'];
const radiuses = ['0', '1', '2', '3', '4'];

export function ThemeSettings() {
  const { settings, update, reset } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Theme Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the application
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div>
          <Label>Theme Mode</Label>
          <div className="flex gap-2 mt-2">
            {themes.map(theme => (
              <Button
                key={theme}
                variant={settings.theme === theme ? 'default' : 'outline'}
                onClick={() => update('theme', theme)}
              >
                {theme}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <Label>Base Color</Label>
          <div className="flex gap-2 mt-2">
            {bases.map(base => (
              <Button
                key={base}
                variant={settings.themeBase === base ? 'default' : 'outline'}
                onClick={() => update('themeBase', base)}
              >
                {base}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Add more settings as needed */}
      </div>
      
      <Separator />
      
      <Button variant="outline" onClick={reset}>
        Reset to Default
      </Button>
    </div>
  );
}
```

---

## Theme Settings Page

### Angular Structure

```
features/settings/presentation/pages/theme-settings/
├── theme-settings.component.ts
├── theme-settings.component.html
└── theme-settings.component.scss
```

### React Structure

```tsx
// app/(dashboard)/settings/theme/page.tsx
import { ThemeSettings } from '@/app/_components/layout/theme-settings';

export default function ThemeSettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <ThemeSettings />
    </div>
  );
}
```

---

*Last updated: 2026-08-26 | Version: 1.0.0*
