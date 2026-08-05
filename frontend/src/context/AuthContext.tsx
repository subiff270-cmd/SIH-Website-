import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { MOCK_USERS } from '../mockData';

interface RegisterInput {
  name: string;
  emailOrPhone: string;
  role: Role;
  city?: string;
}

interface AuthContextType {
  currentUser: User | null;
  registeredUsers: User[];
  login: (emailOrPhone: string, role: Role) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  logout: () => void;
  switchRole: (role: Role) => void;
  isAuthenticated: boolean;
  isAccountRegistered: (emailOrPhone: string) => boolean;
}

// Initial registered user database (3 roles)
const INITIAL_REGISTERED_USERS: User[] = [
  MOCK_USERS.citizen,
  MOCK_USERS.officer,
  MOCK_USERS.worker,
  {
    id: 'user_c2',
    name: 'Priya Sundaram',
    email: 'priya.sundaram@example.com',
    phone: '+91 98765 12345',
    role: 'citizen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rewardPoints: 240
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('civic_registered_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_REGISTERED_USERS;
      }
    }
    return INITIAL_REGISTERED_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('civic_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return MOCK_USERS.citizen;
      }
    }
    return MOCK_USERS.citizen;
  });

  useEffect(() => {
    localStorage.setItem('civic_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('civic_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('civic_user');
    }
  }, [currentUser]);

  const isAccountRegistered = (emailOrPhone: string): boolean => {
    const query = emailOrPhone.trim().toLowerCase();
    if (!query) return false;
    return registeredUsers.some(
      (u) => u.email.toLowerCase() === query || (u.phone && u.phone.toLowerCase() === query)
    );
  };

  const login = async (emailOrPhone: string, role: Role): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const query = emailOrPhone.trim().toLowerCase();

    const existing = registeredUsers.find(
      (u) => u.email.toLowerCase() === query || (u.phone && u.phone.toLowerCase() === query)
    );

    if (!existing) {
      throw new Error(`No account found for "${emailOrPhone}". Please click "Create New Account" to register first!`);
    }

    const userToSet: User = {
      ...existing,
      role: role || existing.role
    };

    setCurrentUser(userToSet);
    return userToSet;
  };

  const register = async (input: RegisterInput): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const query = input.emailOrPhone.trim().toLowerCase();

    if (isAccountRegistered(query)) {
      throw new Error(`An account with "${input.emailOrPhone}" is already registered. Please sign in!`);
    }

    const isEmail = query.includes('@');
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: input.name,
      email: isEmail ? query : `${input.name.toLowerCase().replace(/\s+/g, '')}@civic.gov.in`,
      phone: !isEmail ? query : '+91 98765 43210',
      role: input.role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rewardPoints: 100
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const switchRole = (role: Role) => {
    if (MOCK_USERS[role]) {
      setCurrentUser(MOCK_USERS[role]);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        registeredUsers,
        login,
        register,
        logout,
        switchRole,
        isAuthenticated: !!currentUser,
        isAccountRegistered
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
