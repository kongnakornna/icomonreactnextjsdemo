'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/src/core/services/theme.service';

const THEMES = [
  { key: 'blue', class: 'bg-blue' },
  { key: 'azure', class: 'bg-azure' },
  { key: 'indigo', class: 'bg-indigo' },
  { key: 'purple', class: 'bg-purple' },
  { key: 'pink', class: 'bg-pink' },
  { key: 'red', class: 'bg-red' },
  { key: 'orange', class: 'bg-orange' },
  { key: 'yellow', class: 'bg-yellow' },
  { key: 'lime', class: 'bg-lime' },
  { key: 'green', class: 'bg-green' },
  { key: 'teal', class: 'bg-teal' },
  { key: 'cyan', class: 'bg-cyan' },
];

const FONTS: { key: string; label: string }[] = [
  { key: 'sans-serif', label: 'Sans Serif' },
  { key: 'serif', label: 'Serif' },
  { key: 'monospace', label: 'Monospace' },
  { key: 'comic', label: 'Comic' },
];

const BASES = ['slate', 'gray', 'zinc', 'neutral', 'stone'];
const RADII = ['0', '0.5', '1', '1.5', '2'];

export function ThemeBuilder() {
  const { settings, update, reset } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="btn btn-floating btn-icon btn-primary"
        onClick={() => setOpen(!open)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-sm">
          <path d="M3 21v-4a4 4 0 1 1 4 4h-4" />
          <path d="M21 3a16 16 0 0 0 -12.8 10.2" />
          <path d="M21 3a16 16 0 0 1 -10.2 12.8" />
          <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
        </svg>
      </button>

      {open && (
        <div className="offcanvas offcanvas-start show" tabIndex={-1} ref={panelRef} style={{ visibility: 'visible' }}>
          <div className="offcanvas-header">
            <h2 className="offcanvas-title">Theme Settings</h2>
            <button type="button" className="btn-close" onClick={() => setOpen(false)} aria-label="Close" />
          </div>
          <div className="offcanvas-body d-flex flex-column">
            <div>
              <div className="mb-4">
                <label className="form-label">Color Mode</label>
                <div className="form-selectgroup">
                  <label className="form-selectgroup-item">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      className="form-selectgroup-input"
                      checked={settings.theme === 'light'}
                      onChange={() => update('theme', 'light')}
                    />
                    <span className="form-selectgroup-label">Light</span>
                  </label>
                  <label className="form-selectgroup-item">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      className="form-selectgroup-input"
                      checked={settings.theme === 'dark'}
                      onChange={() => update('theme', 'dark')}
                    />
                    <span className="form-selectgroup-label">Dark</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Primary Color</label>
                <div className="row g-2">
                  {THEMES.map((t) => (
                    <div className="col-auto" key={t.key}>
                      <label className="form-colorinput" title={t.key}>
                        <input
                          type="radio"
                          name="theme-primary"
                          value={t.key}
                          className="form-colorinput-input"
                          checked={settings.themePrimary === t.key}
                          onChange={() => update('themePrimary', t.key)}
                        />
                        <span className={`form-colorinput-color ${t.class}`} />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Font Family</label>
                <div className="form-selectgroup">
                  {FONTS.map((f) => (
                    <label className="form-selectgroup-item" key={f.key}>
                      <input
                        type="radio"
                        name="theme-font"
                        value={f.key}
                        className="form-selectgroup-input"
                        checked={settings.themeFont === f.key}
                        onChange={() => update('themeFont', f.key)}
                      />
                      <span className="form-selectgroup-label">{f.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Theme Base (Gray Shade)</label>
                <div className="form-selectgroup">
                  {BASES.map((b) => (
                    <label className="form-selectgroup-item" key={b}>
                      <input
                        type="radio"
                        name="theme-base"
                        value={b}
                        className="form-selectgroup-input"
                        checked={settings.themeBase === b}
                        onChange={() => update('themeBase', b)}
                      />
                      <span className="form-selectgroup-label">{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Border Radius</label>
                <div className="form-selectgroup">
                  {RADII.map((r) => (
                    <label className="form-selectgroup-item" key={r}>
                      <input
                        type="radio"
                        name="theme-radius"
                        value={r}
                        className="form-selectgroup-input"
                        checked={settings.themeRadius === r}
                        onChange={() => update('themeRadius', r)}
                      />
                      <span className="form-selectgroup-label">{r}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <button type="button" className="btn w-100 mb-2" onClick={reset}>
                Reset
              </button>
              <button type="button" className="btn btn-primary w-100" onClick={() => setOpen(false)}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {open && <div className="offcanvas-backdrop fade show" onClick={() => setOpen(false)} />}
    </>
  );
}
