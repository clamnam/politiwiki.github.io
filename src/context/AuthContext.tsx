import { createContext, useState, useContext, useEffect, ReactNode, forwardRef, ForwardedRef } from 'react';
import UserService from '@/api/userService';
import axios from 'axios';
import { UserData } from '@/types';

interface AuthContextType {
  role: number;
  isLoggedIn: boolean;
  login: (data: UserData) => void;
  logout: () => void;
}

// instantiate  authentication context 
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that wraps the application and provides authentication state
export const AuthProvider = forwardRef(function AuthProvider(
  { children }: { children: ReactNode },
  ref: ForwardedRef<HTMLDivElement>
) {
  // State for tracking login status and user role
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(0.0);

  useEffect(() => {
    // check if saved token exists
    const token = UserService.userRetrieval();
    if (token) {
      setIsLoggedIn(true);

      // Fetch and set user's role
      findRole().then(roleValue => {
        setRole(roleValue);
      });
    }
  }, []);

  // Login handler 
  const login = (data: UserData) => {
    UserService.userSave(data);  // Save user data
    setIsLoggedIn(true);

    // Fetch and set user's role after successful login
    findRole().then(roleValue => {
      setRole(roleValue);
    });
  };

  // logout handler 
  const logout = () => {
    const token = UserService.userRetrieval();
    if (token) {
      // Send logout request to the backend
      axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_LOGOUT_ENDPOINT}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).catch(error => console.error("Logout error:", error));
      UserService.userDelete();  //on success remove cookies
    }
    setIsLoggedIn(false);  // and set logged in state fallse
  };

  // Provide authentication context to child components
  return (
    <AuthContext.Provider value={{ role, isLoggedIn, login, logout }}>
      <div ref={ref}>
        {children}
      </div>
    </AuthContext.Provider>
  );
});

//  function to fetch user's role from api
function findRole(): Promise<number> {
  const url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_ROLE_ENDPOINT}`;
  const data = UserService.userRetrieval();
  const token = data.token;

  // Make API request to get current user role
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    // Convert role to number and return it
    return parseFloat(response.data.title);
  })
    .catch(error => {
      console.error("Error fetching role:", error);
      return 0;  // Return default role on error
    });
}

// Custom hook to use authentication context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
