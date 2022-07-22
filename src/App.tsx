import { Center, useDisclosure } from '@chakra-ui/react';
import { addDays, subDays } from 'date-fns';
import { useState } from 'react';

import { EventsDrawer } from './components/EventsDrawer';

import { EventsCalendar } from './components/EventsCalendar';

const events = [
  { id: '1', title: 'Festa Infantil', date: subDays(new Date(), 6), start: '09:30', end: '11:30' },
  { id: '2', title: 'Festa Infantil', date: subDays(new Date(), 9), start: '12:30', end: '16:00' },
  { id: '3', title: 'Festa Infantil', date: addDays(new Date(), 1), start: '07:30', end: '12:00' },
  { id: '4', title: 'Festa Infantil', date: addDays(new Date(), 2), start: '07:30', end: '09:30' },
  { id: '5', title: 'Festa Infantil', date: addDays(new Date(), 2), start: '10:00', end: '11:30' },
  { id: '6', title: 'Festa Infantil', date: addDays(new Date(), 2), start: '12:30', end: '15:00' },
  { id: '7', title: 'Festa Infantil', date: addDays(new Date(), 2), start: '15:30', end: '16:30' },
  { id: '8', title: 'Festa Infantil', date: addDays(new Date(), 2), start: '19:30', end: '22:00' },
];

export function App() {
  const eventDrawerDisclosure = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  function handleCalendarDayClick(date: Date) {
    setSelectedDate(date);
    eventDrawerDisclosure.onOpen();
  }

  return (
    <Center>
      <EventsCalendar onClickDay={handleCalendarDayClick} events={events} />

      <EventsDrawer
        selectedDate={selectedDate!}
        events={events}
        {...eventDrawerDisclosure}
      />
    </Center>
  );
}
