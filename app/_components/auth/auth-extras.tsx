'use client';

import { useState, useEffect } from 'react';
import { LanguageSelector } from './language-selector';
import { ThemeBuilder } from './theme-builder';

export function AuthExtras() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div>
      <div className="position-absolute top-0 end-0 p-3">
        {mounted && <LanguageSelector />}
      </div>
      {mounted && <ThemeBuilder />}
    </div>
  );
}
