import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, User, LoginRequest, LoginResponse } from '../types';
import { authService } from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on app load
    const storedToken = authService.getStoredToken();
    const storedUser = authService.getStoredUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await authService.login(credentials);
      
      // If 2FA is required or setup is required, return the response without setting auth state
      if (response.requiresTwoFactor || response.requiresTwoFactorSetup) {
        return response;
      }
      
      // Normal login - set auth state
      const { token: newToken, user: newUser } = response;
      if (newToken && newUser) {
        setToken(newToken);
        setUser(newUser);
        authService.setStoredAuth(newToken, newUser);
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    authService.logout();
  }, []);

  const updateUser = useCallback(async () => {
    try {
      const profileResponse = await authService.getProfile();
      const updatedUser = profileResponse.user;
      setUser(updatedUser);
      if (token) {
        authService.setStoredAuth(token, updatedUser);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  }, [token]);

  const hasRole = useCallback((roleName: string): boolean => {
    if (!user || !user.roles) return false;
    return user.roles.includes(roleName);
  }, [user]);

  const hasAnyRole = useCallback((roleNames: string[]): boolean => {
    if (!user || !user.roles) return false;
    return roleNames.some(role => user.roles?.includes(role));
  }, [user]);

  // Memoize context value to prevent unnecessary re-renders
  const value: AuthContextType = useMemo(() => ({
    user,
    token,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user && !!token,
    isLoading,
    hasRole,
    hasAnyRole,
  }), [user, token, login, logout, updateUser, isLoading, hasRole, hasAnyRole]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
