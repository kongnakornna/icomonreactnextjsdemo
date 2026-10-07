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
