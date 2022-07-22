import { Center } from '@chakra-ui/react';
import { addDays, subDays } from 'date-fns';

import { EventsCalendar } from './components/EventsCalendar';

export function App() {
  return (
    <Center>
      <EventsCalendar
        onClickDay={console.log}
        events={[
          { id: '1', title: 'Festa Infantil', date: subDays(new Date(), 6) },
          { id: '2', title: 'Festa Infantil', date: subDays(new Date(), 9) },
          { id: '3', title: 'Festa Infantil', date: addDays(new Date(), 1) },
          { id: '4', title: 'Festa Infantil', date: addDays(new Date(), 2) },
          { id: '5', title: 'Festa Infantil', date: addDays(new Date(), 2) },
          { id: '6', title: 'Festa Infantil', date: addDays(new Date(), 2) },
          { id: '7', title: 'Festa Infantil', date: addDays(new Date(), 2) },
          { id: '8', title: 'Festa Infantil', date: addDays(new Date(), 2) },
        ]}
      />
    </Center>
  );
}
