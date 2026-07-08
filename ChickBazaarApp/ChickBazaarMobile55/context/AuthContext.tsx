import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  loading: boolean;
  loggedIn: boolean;
  login: (mobile: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

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

      const mobile =
        await AsyncStorage.getItem(
          "retailerMobile"
        );

      setLoggedIn(!!mobile);

    } finally {

      setLoading(false);

    }

  }

  async function login(
    mobile: string
  ) {

    await AsyncStorage.setItem(
      "retailerMobile",
      mobile
    );

    setLoggedIn(true);

  }

  async function logout() {

    await AsyncStorage.clear();

    setLoggedIn(false);

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