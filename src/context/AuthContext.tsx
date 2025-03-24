import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import TokenService from '@/api/tokenService';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check token on initial load
    const token = TokenService.tokenRetrieval();
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token: string) => {
    TokenService.tokenSave(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    const token = TokenService.tokenRetrieval();
    
    if (token) {
      console.log("Logging out...", token);
      axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_LOGOUT_ENDPOINT}`, 
        {}, // Empty body or you can pass any required body data here
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).catch(error => console.error("Logout error:", error));
      TokenService.tokenDelete();
    }
    
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}