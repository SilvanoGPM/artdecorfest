import Calendar, { DateCallback } from 'react-calendar';
import { format, isSameDay, isSameMonth, isSameYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Box, Center, Icon, Text } from '@chakra-ui/react';
import { BsPlusLg } from 'react-icons/bs';

import { titleString } from '../../utils/titleString';

import './styles.scss';

interface Event {
  id: string;
  title: string;
  date: Date;
}

interface EventsCalendarProps {
  events: Event[];
  onClickDay?: DateCallback;
}

const MAX_EVENTS_DISPLAY = 3;

function isSameDate(leftDate: Date, rightDate: Date) {
  return (
    isSameDay(leftDate, rightDate) &&
    isSameMonth(leftDate, rightDate) &&
    isSameYear(leftDate, rightDate)
  );
}

export function EventsCalendar({ events, onClickDay }: EventsCalendarProps) {
  function formatShortWeekday(_: string, date: Date) {
    return format(date, 'EEEE', { locale: ptBR })[0];
  }

  function navigationLabel({ date }: { date: Date }) {
    return (
      <Text fontWeight="bold" fontSize="2xl">
        {titleString(format(date, 'MMMM yyyy', { locale: ptBR }))}
      </Text>
    );
  }

  function titeContent({ date }: { date: Date }) {
    const eventsInDay = events.filter((event) => isSameDate(event.date, date));

    if (eventsInDay.length === 0) {
      return <></>;
    }

    const eventsSymbols = eventsInDay
      .slice(0, MAX_EVENTS_DISPLAY)
      .map(({ id }) => (
        <Box key={id} w="2" h="2" rounded="full" bg="orange.300" />
      ));

    return (
      <Center mt="1" as={Center} flexWrap="wrap" gap="1px">
        {eventsSymbols}
        {eventsInDay.length > MAX_EVENTS_DISPLAY && (
          <Icon as={BsPlusLg} w="2" h="2" color="orange.300" />
        )}
      </Center>
    );
  }

  return (
    <Calendar
      navigationLabel={navigationLabel}
      showNeighboringMonth={false}
      formatShortWeekday={formatShortWeekday}
      tileContent={titeContent}
      onClickDay={onClickDay}
    />
  );
}
