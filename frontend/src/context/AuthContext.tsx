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

// Initial registered user database (EXACTLY 3 ROLES)
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
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out any stale admin accounts
          return parsed.filter((u) => u.role === 'citizen' || u.role === 'officer' || u.role === 'worker');
        }
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
        const parsed = JSON.parse(saved);
        // Strict role validation (Exactly 3 roles)
        if (parsed && (parsed.role === 'citizen' || parsed.role === 'officer' || parsed.role === 'worker')) {
          return parsed;
        }
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
    if (currentUser && (currentUser.role === 'citizen' || currentUser.role === 'officer' || currentUser.role === 'worker')) {
      localStorage.setItem('civic_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('civic_user');
      setCurrentUser(MOCK_USERS.citizen);
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
    const query = emailOrPhone.trim().toLowerCase();
    
    // Check if account exists
    const existing = registeredUsers.find(
      (u) => (u.email.toLowerCase() === query || (u.phone && u.phone.toLowerCase() === query))
    );

    if (!existing) {
      throw new Error(`Account "${emailOrPhone}" is not registered. Please create an account first.`);
    }

    const updatedUser = { ...existing, role };
    setCurrentUser(updatedUser);
    return updatedUser;
  };

  const register = async (input: RegisterInput): Promise<User> => {
    const query = input.emailOrPhone.trim().toLowerCase();
    
    const alreadyExists = registeredUsers.some(
      (u) => u.email.toLowerCase() === query || (u.phone && u.phone.toLowerCase() === query)
    );

    if (alreadyExists) {
      throw new Error(`Account "${input.emailOrPhone}" is already registered. Please sign in.`);
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: input.name,
      email: input.emailOrPhone.includes('@') ? input.emailOrPhone : `${input.name.toLowerCase().replace(/\s+/g, '')}@civicai.gov.in`,
      phone: !input.emailOrPhone.includes('@') ? input.emailOrPhone : '+91 98765 00000',
      role: input.role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rewardPoints: 100
    };

    setRegisteredUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('civic_user');
  };

  const switchRole = (role: Role) => {
    if (currentUser) {
      const updated = { ...currentUser, role };
      setCurrentUser(updated);
    } else {
      if (role === 'officer') setCurrentUser(MOCK_USERS.officer);
      else if (role === 'worker') setCurrentUser(MOCK_USERS.worker);
      else setCurrentUser(MOCK_USERS.citizen);
    }
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
