import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from 'react-router-dom';
import { Principal } from '@dfinity/principal';

interface User {
  address: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  principal: Principal | null;
  loginMetamask: (userData: User) => Promise<void>;
  loginICP: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [principal, setPrincipal] = useState<Principal | null>(null);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('PeanutFundtoken='))
        ?.split('=')[1];

      if (token) {
        try {
          const p = Principal.fromText(token);
          setPrincipal(p);
          setIsAuthenticated(true);
        } catch (error) {
          setUser({ address: token });
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const loginMetamask = async (userData: User) => {
    try {
      document.cookie = `PeanutFundtoken=${userData.address}; path=/; secure; samesite=strict`;
      setIsAuthenticated(true);
      setUser(userData);
      navigate('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const loginICP = async () => {
    try {
      const client = await AuthClient.create();
      setAuthClient(client);
      await client.login({
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: async () => {
          const identity = client.getIdentity();
          const p = identity.getPrincipal();
          setPrincipal(p);
          setIsAuthenticated(true);
          document.cookie = `PeanutFundtoken=${p.toString()}; path=/; secure; samesite=strict`;
          navigate('/');
        },
        onError: (error: any) => {
          console.error('Login failed:', error);
          throw error;
        }
      });
    } catch (error: any) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    document.cookie = 'PeanutFundtoken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsAuthenticated(false);
    setUser(null);
    setPrincipal(null);
    navigate('/login');
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    principal,
    loginMetamask,
    loginICP,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
