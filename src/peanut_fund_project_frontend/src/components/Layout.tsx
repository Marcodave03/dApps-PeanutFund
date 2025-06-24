// src/components/Layout.tsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { colors } = useTheme();

  return (
    <div className={`min-h-screen ${colors.bg} ${colors.text}`}>
      <Navigation />
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
