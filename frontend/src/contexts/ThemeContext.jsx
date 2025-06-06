import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const themeColors = {
  dashboardTheme: {
    bg: 'bg-dashboardTheme-background',
    bgCard: 'bg-dashboardTheme-surface',
    text: 'text-dashboardTheme-text',
    muted: 'text-dashboardTheme-muted',
    border: 'border-dashboardTheme-border',
    hover: 'hover:bg-dashboardTheme-border/50',
  },
  blackTheme: {
    bg: 'bg-blackTheme-background',
    bgCard: 'bg-blackTheme-surface',
    text: 'text-blackTheme-text',
    muted: 'text-blackTheme-muted',
    border: 'border-blackTheme-border',
    hover: 'hover:bg-blackTheme-border/50',
  },
  creamTheme: {
    bg: 'bg-creamTheme-background',
    bgCard: 'bg-creamTheme-surface',
    text: 'text-creamTheme-text',
    muted: 'text-creamTheme-muted',
    border: 'border-creamTheme-border',
    hover: 'hover:bg-creamTheme-border/50',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dashboardTheme';
  });

  useEffect(() => {
    const body = document.body;
    body.classList.remove('dashboardTheme', 'blackTheme', 'creamTheme');
    body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const colors = themeColors[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
