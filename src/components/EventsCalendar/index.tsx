import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Text } from '@chakra-ui/react';

import './styles.scss';
import { titleString } from '../../utils/titleString';

export function EventsCalendar() {
  function formatShortWeekday(_: string, date: Date) {
    return format(date, 'EEEE', { locale: ptBR })[0];
  }

  return (
    <Calendar
      navigationLabel={({ date }) => {
        return (
          <Text fontWeight="bold" fontSize="2xl">
            {titleString(format(date, 'MMMM yyyy', { locale: ptBR }))}
          </Text>
        );
      }}
      showNeighboringMonth={false}
      formatShortWeekday={formatShortWeekday}
    />
  );
}
