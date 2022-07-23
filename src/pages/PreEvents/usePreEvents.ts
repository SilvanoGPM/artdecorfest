import { useBoolean } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { ptBR } from 'date-fns/locale';

import { useAuth } from '../../contexts/AuthContext';
import { streamPrevEvents } from '../../services/firebase/preEvents';
import { getUser } from '../../services/firebase/users';
import { PreEvent } from '.';

export function usePreEvents(): [PreEvent[], boolean] {
  const [preEvents, setPreEvents] = useState<PreEvent[]>([]);
  const [isLoading, setIsLoading] = useBoolean(true);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    const unsubcribe = streamPrevEvents(async (rawEvents) => {
      setIsLoading.off();

      const eventsPromises = rawEvents.map<Promise<PreEvent>>(async (event) => ({
        ...event,
        user: await getUser(event.userRef.id),
        formattedDate: format(event.date.toDate(), "dd 'de' MMMM, yyyy", { locale: ptBR }),
        date: event.date.toDate(),
      }));

      const events = await Promise.all(eventsPromises);

      setPreEvents(events);

      setIsLoading.off();
    });

    return () => unsubcribe();
  }, [isAdmin, user]);

  return [preEvents, isLoading];
}
