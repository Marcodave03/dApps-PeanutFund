import { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [authClient, setAuthClient] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);

      const isAuthenticated = await client.isAuthenticated();
      if (isAuthenticated) {
        const identity = client.getIdentity();
        setPrincipal(identity.getPrincipal().toString());
        setIsAuthenticated(true);
        if (!document.cookie.includes("PeanutFundtoken")) {
          document.cookie = `PeanutFundtoken=${savedPrincipal}; path=/; secure; samesite=strict`;
        }
      }
    };
    initAuth();
  }, []);

  const login = async () => {
    if (!authClient) return;

    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        setPrincipal(identity.getPrincipal().toString());
        setIsAuthenticated(true);
        document.cookie = `PeanutFundtoken=${principal}; path=/; secure; samesite=strict`;
      },
      onError: (err) => {
        console.error("Login gagal:", err);
      },
    });
  };

  const logout = async () => {
    if (!authClient) return;

    await authClient.logout();
    setPrincipal(null);
    setIsAuthenticated(false);
    document.cookie = "PeanutFundtoken=; path=/; max-age=0";
  };
  return { isAuthenticated, principal, login, logout };
};
