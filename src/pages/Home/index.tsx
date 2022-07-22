import { Center, Heading, useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { EventsDrawer } from '../../components/EventsDrawer';
import { EventsCalendar } from '../../components/EventsCalendar';
import { streamEvents } from '../../services/firebase/events';
import { DefaultLayout } from '../../components/DefaultLayout';

export interface Event {
  id: string;
  title: string;
  date: Date;
  start: string;
  end: string;
}

export function Home() {
  const eventDrawerDisclosure = useDisclosure();

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const unsubcribe = streamEvents((rawEvents) => {
      const events = rawEvents.map<Event>((event) => ({
        ...event,
        date: new Date(event.date.seconds * 1000),
      }));

      setEvents(events);
    });

    return () => unsubcribe();
  }, []);

  function handleCalendarDayClick(date: Date) {
    setSelectedDate(date);
    eventDrawerDisclosure.onOpen();
  }


  return (
    <DefaultLayout>
      <Center mt="8" flexDirection="column">
        <Heading as="h2" mb="8">
          Calendário de Eventos
        </Heading>

        <EventsCalendar onClickDay={handleCalendarDayClick} events={events} />

        <EventsDrawer
          selectedDate={selectedDate!}
          events={events}
          {...eventDrawerDisclosure}
        />
      </Center>
    </DefaultLayout>
  );
}
