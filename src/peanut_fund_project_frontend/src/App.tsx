// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layout and Route Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Page Components
import { DashboardPage } from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import MarketplacePage from './pages/MarketplacePage';
import BotDetailPage from './pages/BotDetailPage';
import BotConfigPage from './pages/BotConfigPage';
import MyBotsPage from './pages/MyBotsPage';
import HelpPage from './pages/HelpPage';
import ProfilePage from './pages/ProfilePage';
import BotActivitiesPage from './pages/BotActivitiesPage';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/help" element={<Layout><HelpPage /></Layout>} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/marketplace" element={<ProtectedRoute><MarketplacePage /></ProtectedRoute>} />
          <Route path="/bots/:id" element={<ProtectedRoute><BotDetailPage /></ProtectedRoute>} />
          <Route path="/my-bots/activity" element={<ProtectedRoute><BotActivitiesPage /></ProtectedRoute>} />
          <Route path="/bots/:id/config" element={<ProtectedRoute><BotConfigPage /></ProtectedRoute>} />
          <Route path="/my-bots" element={<ProtectedRoute><MyBotsPage /></ProtectedRoute>} />

          {/* 404 - Not Found */}
          <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;