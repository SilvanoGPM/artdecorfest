import { useEffect, useState } from 'react';

import Repository from '../libs/Repository';

type UseStorageReturn<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  boolean
];

export function useStorage<T>(
  key: string,
  initialValue: T
): UseStorageReturn<T> {
  const [loading, setLoading] = useState<boolean>(true);
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    function loadStoredValue(): void {
      const valueFound = Repository.get<T>(key);

      if (valueFound !== undefined && valueFound !== null) {
        setStoredValue(valueFound);
      }

      setLoading(false);
    }

    loadStoredValue();
  }, [key]);

  useEffect(() => {
    function storeValue(): void {
      Repository.save<T>(key, storedValue);
    }

    if (!loading) {
      storeValue();
    }
  }, [storedValue, loading, key]);

  return [storedValue, setStoredValue, loading];
}
