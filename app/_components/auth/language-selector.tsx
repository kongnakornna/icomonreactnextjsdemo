'use client';

import { useState, useRef, useEffect } from 'react';
import { useI18n, type SupportedLanguage } from '@/src/core/services/i18n.service';

export function LanguageSelector() {
  const { lang, changeLanguage, languages } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="dropdown" ref={ref}>
      <button
        className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <img src={`/assets/flags/${current.flag}.svg`} height="18" alt="" />
        {current.name}
      </button>
      <ul className={`dropdown-menu dropdown-menu-end ${open ? 'show' : ''}`}>
        {languages.map((l) => (
          <li key={l.code}>
            <button
              className="dropdown-item d-flex align-items-center gap-2"
              type="button"
              onClick={() => handleSelect(l.code)}
            >
              <img src={`/assets/flags/${l.flag}.svg`} height="18" alt="" />
              {l.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
