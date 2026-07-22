import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AuthService, {
  LoginResponse,
} from "../services/auth.service";

type AuthContextType = {
  loading: boolean;
  loggedIn: boolean;
  login: (
    session: LoginResponse
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] =
    useState(true);

  const [loggedIn, setLoggedIn] =
    useState(false);

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const isLoggedIn =
        await AuthService.isLoggedIn();

      setLoggedIn(isLoggedIn);
    } catch {
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }

  async function login(
    session: LoginResponse
  ) {
    // AuthService has already stored the token
    // and retailer before this is called.
    if (session.success) {
      setLoggedIn(true);
    }
  }

  async function logout() {
    try {
      await AuthService.logout();
      setLoggedIn(false);
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        loggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}