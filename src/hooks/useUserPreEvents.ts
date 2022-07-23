import { useBoolean } from '@chakra-ui/react';
import { DocumentReference } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useAuth } from '../contexts/AuthContext';
import { streamUserPrevEvents } from '../services/firebase/preEvents';
import { User } from '../services/firebase/users';

interface PreEvent {
  id: string;
  userRef: DocumentReference<User>;
  title: string;
  start: string;
  end: string;
  date: Date;
}

export function useEvents(): [PreEvent[], boolean] {
  const [preEvents, setPreEvents] = useState<PreEvent[]>([]);
  const [isLoading, setIsLoading] = useBoolean(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    const unsubcribe = streamUserPrevEvents(user?.id!, (rawEvents) => {
      setIsLoading.off();

      const events = rawEvents.map<PreEvent>((event) => ({
        ...event,
        date: event.date.toDate(),
      }));

      setPreEvents(events);

      setIsLoading.off();
    });

    return () => unsubcribe();
  }, [isAuthenticated, user]);

  return [preEvents, isLoading];
}
