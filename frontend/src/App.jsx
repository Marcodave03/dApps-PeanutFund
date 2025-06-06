// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';

// Pages
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import MarketplacePage from './pages/MarketplacePage';
import BotDetailPage from './pages/BotDetailPage';
import BotConfigPage from './pages/BotConfigPage';
import MyBotsPage from './pages/MyBotsPage';
import HelpPage from './pages/HelpPage';
import ProfilePage from './pages/ProfilePage';
import BotActivitiesPage from './pages/BotActivitiesPage';
import { useTheme } from './contexts/ThemeContext';

function Layout({ children }) {
  const { colors } = useTheme();
  return (
    <div className={`min-h-screen ${colors.bg} ${colors.text}`}>
      <Navigation />
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Layout>{children}</Layout>;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Layout>{children}</Layout>;
}

function App() {
  return (
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            
            <Route path="/help" element={
              <Layout>
                <HelpPage />
              </Layout>
            } />

            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            <Route path="/marketplace" element={
              <ProtectedRoute>
                <MarketplacePage />
              </ProtectedRoute>
            } />
            
            <Route path="/bots/:id" element={
              <ProtectedRoute>
                <BotDetailPage />
              </ProtectedRoute>
            } />

            <Route path="/my-bots/activity" element={
              <ProtectedRoute>
                <BotActivitiesPage />
              </ProtectedRoute>
            } />
            
            <Route path="/bots/:id/config" element={
              <ProtectedRoute>
                <BotConfigPage />
              </ProtectedRoute>
            } />
            
            <Route path="/my-bots" element={
              <ProtectedRoute>
                <MyBotsPage />
              </ProtectedRoute>
            } />

            {/* 404 - Not Found */}
            <Route path="*" element={
              <Layout>
                <NotFoundPage />
              </Layout>
            } />
          </Routes>
        </AuthProvider>
      </Router>
  //   </ThemeProvider>
  );
}
export default App;