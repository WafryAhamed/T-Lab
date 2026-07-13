import React, { useState, createContext, useContext } from 'react';
import { Role, User } from '../types';
import { users } from '../data/mockData';
import { useScreenInit } from '../useScreenInit.js';
interface AuthContextValue {
  currentUser: User | null;
  login: (role: Role) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const roleToUser: Record<Role, string> = {
  Administrator: 'u1',
  'Project Manager': 'u2',
  'Team Member': 'u3'
};
export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const screenInit = useScreenInit() as {role?: Role;};
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (screenInit.role && roleToUser[screenInit.role]) {
      return users.find((u) => u.id === roleToUser[screenInit.role!]) || null;
    }
    return null;
  });
  const login = (role: Role) => {
    const user = users.find((u) => u.id === roleToUser[role]) || null;
    setCurrentUser(user);
  };
  const logout = () => setCurrentUser(null);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout
      }}>
      
      {children}
    </AuthContext.Provider>);

}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}