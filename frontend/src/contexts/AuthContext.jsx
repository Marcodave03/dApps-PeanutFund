import { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('PeanutFundtoken='));
      
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const loginMetamask = async (userData) => {
    try {
      document.cookie = `PeanutFundtoken=${userData.address}; path=/; secure; samesite=strict`;
      setIsAuthenticated(true);
      setUser(userData);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const loginICP = async () => {
    try {
      const client = await AuthClient.create();
      await client.login({
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: async () => {
          const identity = client.getIdentity();
        setPrincipal(identity.getPrincipal().toString());
        setIsAuthenticated(true);
          document.cookie = `PeanutFundtoken=${principal}; path=/; secure; samesite=strict`;
          navigate('/');
        },
        onError: (error) => {
          console.error('Login failed:', error);
          throw error;
        }
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    document.cookie = 'PeanutFundtoken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    user,
    loginMetamask,
    loginICP,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
