import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock user data
const MOCK_USERS = [
  {
    id: 'user-1',
    name: 'John Kamau',
    email: 'john@student.ku.ac.ke',
    phone: '+254712345678',
    password: 'password123',
    isAdmin: false
  },
  {
    id: 'admin-1',
    name: 'Melvin M',
    email: 'melvin@admin.mksu.ac.ke',
    phone: '+254723456789',
    password: 'admin123',
    isAdmin: true
  }
];

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize mock users in localStorage
  useEffect(() => {
    if (!localStorage.getItem('campusGasUsers')) {
      localStorage.setItem('campusGasUsers', JSON.stringify(MOCK_USERS));
    }
  }, []);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('campusGasUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = JSON.parse(localStorage.getItem('campusGasUsers') || '[]');
      const user = users.find((u: any) => u.email === email);
      
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      const { password: _, ...userWithoutPassword } = user;
      
      setUser(userWithoutPassword);
      localStorage.setItem('campusGasUser', JSON.stringify(userWithoutPassword));
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, phone: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = JSON.parse(localStorage.getItem('campusGasUsers') || '[]');
      
      if (users.some((u: any) => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        phone,
        password,
        isAdmin: false,
      };
      
      users.push(newUser);
      localStorage.setItem('campusGasUsers', JSON.stringify(users));
      
      const { password: _, ...userWithoutPassword } = newUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('campusGasUser', JSON.stringify(userWithoutPassword));
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusGasUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};