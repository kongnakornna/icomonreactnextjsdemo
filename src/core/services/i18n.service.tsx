'use client';

import { useState, useEffect, useCallback, useContext, createContext, useMemo, type ReactNode } from 'react';

const STORAGE_KEY = 'icmon_language';
const DEFAULT_LANG = 'en';

export type SupportedLanguage = 'th' | 'en' | 'zh' | 'ja' | 'ko' | 'vi' | 'ms' | 'my' | 'km' | 'lo';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', flag: 'gb' },
  { code: 'th', name: 'ไทย', flag: 'th' },
  { code: 'zh', name: '中文', flag: 'cn' },
  { code: 'ja', name: '日本語', flag: 'jp' },
  { code: 'ko', name: '한국어', flag: 'kr' },
  { code: 'vi', name: 'Tiếng Việt', flag: 'vn' },
  { code: 'ms', name: 'Bahasa Melayu', flag: 'my' },
  { code: 'my', name: 'မြန်မာ', flag: 'mm' },
  { code: 'km', name: 'ភាសាខ្មែរ', flag: 'kh' },
  { code: 'lo', name: 'ພາສາລາວ', flag: 'la' },
];

let translationCache: Record<string, Record<string, string>> = {};

async function loadTranslation(lang: string, _depth = 0): Promise<Record<string, string>> {
  if (translationCache[lang]) {
    return translationCache[lang];
  }
  try {
    const response = await fetch(`/i18n/${lang}.json`);
    if (!response.ok) throw new Error(`Failed to load ${lang}`);
    const data = await response.json();
    translationCache[lang] = data;
    return data;
  } catch {
    console.warn(`[i18n] Failed to load language: ${lang}, falling back to ${DEFAULT_LANG}`);
    if (lang !== DEFAULT_LANG && _depth < 1) {
      return loadTranslation(DEFAULT_LANG, _depth + 1);
    }
    return {};
  }
}

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : path;
}

interface I18nContextValue {
  lang: SupportedLanguage;
  translations: Record<string, string>;
  loading: boolean;
  changeLanguage: (newLang: SupportedLanguage) => void;
}

const I18nContext = createContext<I18nContextValue>({
  lang: DEFAULT_LANG,
  translations: {},
  loading: true,
  changeLanguage: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<SupportedLanguage>(DEFAULT_LANG);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage;
    if (saved) {
      setLang(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    setLoading(true);
    loadTranslation(lang).then((data) => {
      if (!cancelled) {
        setTranslations(data);
        setLoading(false);
        if (typeof document !== 'undefined') {
          document.documentElement.lang = lang;
        }
      }
    });
    return () => { cancelled = true; };
  }, [lang, mounted]);

  const changeLanguage = useCallback((newLang: SupportedLanguage) => {
    localStorage.setItem(STORAGE_KEY, newLang);
    setLang(newLang);
  }, []);

  const value = useMemo(
    () => ({ lang, translations, loading, changeLanguage }),
    [lang, translations, loading, changeLanguage]
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const { lang, translations, loading, changeLanguage } = useContext(I18nContext);

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    let value = getNestedValue(translations, key);
    if (value === key && lang !== DEFAULT_LANG) {
      value = getNestedValue(translationCache[DEFAULT_LANG] || {}, key);
    }
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }
    return value;
  }, [translations, lang]);

  return { lang, t, changeLanguage, loading, languages: SUPPORTED_LANGUAGES };
}
