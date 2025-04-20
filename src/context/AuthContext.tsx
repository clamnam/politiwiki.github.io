import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import UserService from '@/api/userService';
import axios from 'axios';
import { UserData } from '@/types';
interface AuthContextType {
  role: number;
  isLoggedIn: boolean;
  login: (data: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(0.0);

  useEffect(() => {
    // Check token on initial load
    const token = UserService.userRetrieval();
    if (token) {
      setIsLoggedIn(true);

      // Also fetch and set the role on page refresh
      findRole().then(roleValue => {
        setRole(roleValue);
      });
    }
  }, []);

  const login = (data: UserData) => {
    // localStorage.setItem("token", token);

    UserService.userSave(data);
    setIsLoggedIn(true);

    findRole().then(roleValue => {
      setRole(roleValue);
    });
  };

  const logout = () => {
    const token = UserService.userRetrieval();
    if (token) {
      axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_LOGOUT_ENDPOINT}`,
        {}, // Empty body or you can pass any required body data here
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).catch(error => console.error("Logout error:", error));
      UserService.userDelete();
    }

    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ role, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
function findRole(): Promise<number> {
  const url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_ROLE_ENDPOINT}`;
  const data = UserService.userRetrieval();
  const token = data.token;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    // Ensure we're getting a number by using parseFloat
    return parseFloat(response.data.title);
  })
    .catch(error => {
      console.error("Error fetching role:", error);
      return 0;
    });
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
