import { createContext, useCallback, useContext, useEffect } from 'react';

import { login } from '../services/firebase/firebase';
import { useStorage } from '../hooks/useStorage';
import { newUser } from '../services/firebase/users';

export interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

type LoginType = 'google';

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  handleLogin: (type: LoginType) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useStorage<User | null>('@ART_DECOR_FEST/USER', null);

  const isAuthenticated = Boolean(user?.id);

  const handleLogin = useCallback(async (type: LoginType) => {
    try {
      const { user: userToCreate } = await login(type);

      const user = await newUser(userToCreate);

      setUser(user);
    } catch {
      console.log('Não foi possível fazer login');
    }
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextProps {
  return useContext(AuthContext);
}
