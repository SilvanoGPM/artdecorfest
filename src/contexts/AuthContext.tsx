import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useBoolean, useToast } from '@chakra-ui/react';

import { auth, login } from '../services/firebase/firebase';
import { useStorage } from '../hooks/useStorage';
import { getUser, newUser } from '../services/firebase/users';

export interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  phone?: string | null;
}

type LoginType = 'google';

export interface AuthContextProps {
  user: User | null;
  info: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [info, setInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useBoolean(false);
  const toast = useToast();

  const isAuthenticated = Boolean(user?.id);

  useEffect(() => {
    async function loadIsAdmin() {
      const info = await getUser(user?.id!);

      setInfo(info);
      setIsAdmin(info.admin);
    }

    if (isAuthenticated) {
      loadIsAdmin();
    }
  }, [isAuthenticated]);

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
      value={{
        user,
        info,
        isAuthenticated,
        isLoading,
        isAdmin,
        handleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextProps {
  return useContext(AuthContext);
}
