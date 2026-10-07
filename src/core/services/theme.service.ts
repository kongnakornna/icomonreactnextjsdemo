'use client';

import { useState, useEffect, useCallback } from 'react';

export interface ThemeSettings {
  theme: 'light' | 'dark' | 'system';
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
    const loaded = { ...DEFAULTS };
    for (const key of Object.keys(DEFAULTS) as (keyof ThemeSettings)[]) {
      const stored = localStorage.getItem(STORAGE_PREFIX + key);
      if (stored) {
        (loaded as Record<string, string>)[key] = stored;
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
  if (typeof document === 'undefined') return;

  const el = document.documentElement;

  const resolved = s.theme === 'system' ? 'dark' : s.theme;
  el.setAttribute('data-bs-theme', resolved);
  el.setAttribute('data-bs-theme-base', s.themeBase);
  el.setAttribute('data-bs-theme-font', s.themeFont);
  el.setAttribute('data-bs-theme-primary', s.themePrimary);
  el.setAttribute('data-bs-theme-radius', s.themeRadius);

  // Sync dark class for Tailwind
  if (resolved === 'dark') {
    el.classList.add('dark');
  } else {
    el.classList.remove('dark');
  }

  el.classList.remove('theme-slate', 'theme-gray', 'theme-zinc', 'theme-neutral', 'theme-stone');
  el.classList.add('theme-' + s.themeBase);

  const body = document.body;
  body.classList.remove('layout-fluid', 'layout-boxed', 'layout-boxed-2');
  if (s.layout === 'boxed' || s.layout === 'boxed-2') {
    body.classList.add('layout-boxed');
    if (s.layout === 'boxed-2') body.classList.add('layout-boxed-2');
  }
}
