import React, { useEffect, useState, createContext, useContext } from 'react';
type Theme = 'dark' | 'light';
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem('tlab-theme') as Theme | null;
  if (saved === 'dark' || saved === 'light') return saved;
  // System preference detection when no saved preference — default to dark otherwise
  if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches)
  {
    return 'light';
  }
  return 'dark';
}
export function ThemeProvider({ children }: {children: React.ReactNode;}) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');else
    root.classList.remove('dark');
    localStorage.setItem('tlab-theme', theme);
  }, [theme]);
  const toggleTheme = () =>
  setThemeState((t) => t === 'dark' ? 'light' : 'dark');
  const setTheme = (t: Theme) => setThemeState(t);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme
      }}>
      
      {children}
    </ThemeContext.Provider>);

}
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}