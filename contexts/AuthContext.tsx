import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState } from "@/types/auth";
import { STORAGE_KEYS } from "@/constants/storage";
import tryCatch from "@/utils/try-catch";
import { API } from "@/api";
import { LoginUserRequestData, RegisterUserData } from "@/api/types/auth";

interface AuthContextType extends AuthState {
  login: (data: LoginUserRequestData) => Promise<void>;
  register: (data: RegisterUserData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    error: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.accessToken);

      if (storedUser && storedToken) {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          error: null,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error("Error loading stored auth:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const login = async (loginUserData: LoginUserRequestData) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    const [data, err] = await tryCatch(async () =>
      API.Auth.loginUser(loginUserData)
    );

    if (err !== null)
      return setAuthState((prev) => ({
        ...prev,
        error: err,
        isLoading: false,
      }));

    if (data === null)
      return setAuthState((prev) => ({
        ...prev,
        error: new Error("Unknown error."),
        isLoading: false,
      }));

    await AsyncStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(data.value.user)
    );

    await AsyncStorage.setItem(
      STORAGE_KEYS.accessToken,
      JSON.stringify(data.value.accessToken)
    );

    setAuthState({
      user: data.value.user,
      isLoading: false,
      isAuthenticated: true,
      error: null,
    });
  };

  const register = async (registerUserData: RegisterUserData) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    const [data, err] = await tryCatch(async () =>
      API.Auth.registerUser(registerUserData)
    );

    if (err !== null)
      return setAuthState((prev) => ({
        ...prev,
        error: err,
        isLoading: false,
      }));

    if (data === null)
      return setAuthState((prev) => ({
        ...prev,
        error: new Error("Unknown error."),
        isLoading: false,
      }));

    await AsyncStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(data.value.user)
    );

    await AsyncStorage.setItem(
      STORAGE_KEYS.accessToken,
      JSON.stringify(data.value.accessToken)
    );

    setAuthState({
      user: data.value.user,
      isLoading: false,
      isAuthenticated: true,
      error: null,
    });
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    await AsyncStorage.removeItem(STORAGE_KEYS.accessToken);
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
