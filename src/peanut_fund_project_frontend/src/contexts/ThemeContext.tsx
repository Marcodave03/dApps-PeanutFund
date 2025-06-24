import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define the types for the themes
export type ThemeName = 'dashboardTheme' | 'blackTheme' | 'creamTheme';

interface ColorPalette {
  bg: string;
  bgCard: string;
  text: string;
  muted: string;
  border: string;
  hover: string;
}

// Define the shape of the context value
interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colors: ColorPalette;
}

export const themeColors: Record<ThemeName, ColorPalette> = {
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

// Create the context with a default value of undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the props for the ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const storedTheme = localStorage.getItem('theme');
    return (storedTheme && themeColors[storedTheme as ThemeName]) ? storedTheme as ThemeName : 'dashboardTheme';
  });

  useEffect(() => {
    const body = document.body;
    Object.keys(themeColors).forEach(t => body.classList.remove(t));
    body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const colors = themeColors[theme];

  const value: ThemeContextType = { theme, setTheme, colors };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
