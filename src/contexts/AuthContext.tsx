import { createContext, useCallback, useContext } from 'react';
import { useBoolean, useToast } from '@chakra-ui/react';

import { auth, login } from '../services/firebase/firebase';
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
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useBoolean(false);
  const toast = useToast();

  const isAuthenticated = Boolean(user?.id);

  const handleLogin = useCallback(
    async (type: LoginType) => {
      try {
        setIsLoading.on();

        const userToCreate = await login(type);

        const user = await newUser(userToCreate);

        setUser(user);
      } catch {
        toast({ title: 'Não foi possível realizar o login', status: 'error' });
      } finally {
        setIsLoading.off();
      }
    },
    [setUser]
  );

  const logout = useCallback(() => {
    auth.updateCurrentUser(null);

    setUser(null);
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, handleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextProps {
  return useContext(AuthContext);
}
