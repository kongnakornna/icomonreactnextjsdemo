# Theme & Styling Guide

## สารบัญ

1. [Overview](#overview)
2. [Tabler UI Kit](#tabler-ui-kit)
3. [shadcn/ui](#shadcnui)
4. [Tailwind CSS](#tailwind-css)
5. [Theme Management](#theme-management)
6. [Dark Mode](#dark-mode)

---

## Overview

The project uses a dual styling system:
- **Tabler UI Kit** — Layout structure, sidebar, header, components
- **shadcn/ui** — Reusable UI primitives (buttons, cards, inputs, etc.)
- **Tailwind CSS** — Utility-first CSS framework

---

## Tabler UI Kit

### Installation

```bash
npm install @tabler/core
```

### CSS Imports

```css
/* globals.css */
@import '@tabler/core/dist/css/tabler.min.css';
@import '@tabler/core/dist/css/tabler-vendors.min.css';
```

### Layout Classes

| Class | Purpose |
|-------|---------|
| `page` | Main page wrapper |
| `page-wrapper` | Page wrapper with sidebar offset |
| `page-body` | Page body content |
| `page-header` | Page header section |
| `navbar` | Top navigation bar |
| `sidebar` | Side navigation |
| `sidebar-content` | Sidebar scrollable content |
| `container-xl` | Container with max-width |

### Theming

Tabler uses `data-bs-theme` attribute on `<html>`:

```html
<html data-bs-theme="dark">
<html data-bs-theme="light">
```

Theme base colors: `gray`, `slate`, `zinc`, `neutral`, `stone`

---

## shadcn/ui

### Configuration

```json
// components.json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/app/_components",
    "utils": "@/app/_components/utils"
  }
}
```

### Available Components

| Component | File | Purpose |
|-----------|------|---------|
| Button | `app/_components/ui/button.tsx` | Reusable button |
| Card | `app/_components/ui/card.tsx` | Card container |
| Input | `app/_components/ui/input.tsx` | Text input |
| Label | `app/_components/ui/label.tsx` | Form label |
| Checkbox | `app/_components/ui/checkbox.tsx` | Checkbox |
| Dropdown Menu | `app/_components/ui/dropdown-menu.tsx` | Dropdown |
| Avatar | `app/_components/ui/avatar.tsx` | User avatar |
| Separator | `app/_components/ui/separator.tsx` | Divider |
| Sonner | `app/_components/ui/sonner.tsx` | Toast notifications |

### Adding New Components

```bash
npx shadcn@latest add [component-name]
```

---

## Tailwind CSS

### Configuration

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
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### Important: Disable Visibility Plugin

To avoid collision with Bootstrap's `.collapse`:

```javascript
corePlugins: {
  visibility: false,
}
```

---

## Theme Management

### LayoutService (React equivalent)

```typescript
// src/core/services/theme.service.ts
'use client';

import { useState, useEffect } from 'react';

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
  }, []);

  const update = (key: keyof ThemeSettings, value: string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem(STORAGE_PREFIX + key, value);
    applySettings(newSettings);
  };

  const reset = () => {
    setSettings(DEFAULTS);
    for (const key of Object.keys(DEFAULTS)) {
      localStorage.removeItem(STORAGE_PREFIX + key);
    }
    applySettings(DEFAULTS);
  };

  return { settings, update, reset };
}

function applySettings(s: ThemeSettings) {
  const el = document.documentElement;
  el.setAttribute('data-bs-theme', s.theme);
  el.setAttribute('data-bs-theme-base', s.themeBase);
  el.setAttribute('data-bs-theme-font', s.themeFont);
  el.setAttribute('data-bs-theme-primary', s.themePrimary);
  el.setAttribute('data-bs-theme-radius', s.themeRadius);

  el.classList.remove('theme-slate', 'theme-gray', 'theme-zinc', 'theme-neutral', 'theme-stone');
  el.classList.add('theme-' + s.themeBase);

  const body = document.body;
  body.classList.remove('layout-fluid', 'layout-boxed', 'layout-boxed-2');
  if (s.layout === 'boxed' || s.layout === 'boxed-2') {
    body.classList.add('layout-boxed');
    if (s.layout === 'boxed-2') body.classList.add('layout-boxed-2');
  }
}
```

---

## Dark Mode

### Strategy

- `darkMode: 'class'` in Tailwind config
- `next-themes` ThemeProvider in root layout
- Tabler `data-bs-theme="dark"` attribute

### Usage

```tsx
// Switch theme
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

### CSS Variables

```css
/* Light mode */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

/* Dark mode */
:root[class~='dark'] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

---

*Last updated: 2026-08-26*
