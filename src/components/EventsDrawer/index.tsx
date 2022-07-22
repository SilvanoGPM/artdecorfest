import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Flex,
  Text,
} from '@chakra-ui/react';

import { format } from 'date-fns';

import { isSameDate } from '../../utils/isSameDate';

import { EventsCounter } from './EventsCounter';
import { EventsList } from './EventsList';

export interface Event {
  id: string;
  title: string;
  date: Date;
  start: string;
  end: string;
}

interface EventsDrawerProps extends Omit<DrawerProps, 'children'> {
  events: Event[];
  selectedDate: Date | null;
}

export function EventsDrawer({
  events,
  selectedDate,
  ...props
}: EventsDrawerProps) {
  const selectedEvents = events.filter((event) =>
    isSameDate(event?.date, selectedDate || new Date())
  );

  const formattedDate = format(selectedDate || new Date(), 'dd/MM');

  return (
    <Drawer {...props}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader>
            <Flex align="center" justify="space-between">
              Eventos
              <DrawerCloseButton pos="static" />
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <Flex align="center">
              <EventsCounter total={selectedEvents.length} />

              <Text ml="4">{formattedDate}</Text>
            </Flex>

            <EventsList events={selectedEvents} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
