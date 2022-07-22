import { useBoolean } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { streamEvents } from '../../services/firebase/events';

export interface Event {
  id: string;
  title: string;
  date: Date;
  start: string;
  end: string;
}

export function useEvents(): [Event[], boolean] {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useBoolean(true);

  useEffect(() => {
    const unsubcribe = streamEvents((rawEvents) => {
      setIsLoading.off();

      const events = rawEvents.map<Event>((event) => ({
        ...event,
        date: new Date(event.date.seconds * 1000),
      }));

      setEvents(events);

      setIsLoading.off();
    });

    return () => unsubcribe();
  }, []);

  return [events, isLoading];
}
