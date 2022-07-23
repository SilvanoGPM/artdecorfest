import {
  Center,
  Heading,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';

import { useState } from 'react';

import { EventsDrawer } from '../../components/EventsDrawer';
import { EventsCalendar } from '../../components/EventsCalendar';
import { DefaultLayout } from '../../components/DefaultLayout';
import { useEvents } from './useEvents';

export function Home() {
  const eventDrawerDisclosure = useDisclosure();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, isLoading] = useEvents();

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

        {isLoading ? (
          <Spinner size="lg" color="orange" />
        ) : (
          <>
            <EventsCalendar
              onClickDay={handleCalendarDayClick}
              events={events}
            />

            <EventsDrawer
              selectedDate={selectedDate!}
              events={events}
              {...eventDrawerDisclosure}
            />
          </>
        )}
      </Center>
    </DefaultLayout>
  );
}
