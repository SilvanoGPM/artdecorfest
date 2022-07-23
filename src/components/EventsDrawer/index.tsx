import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';

import { isSameDate } from '../../utils/isSameDate';
import { CreateEventModal } from './CreateEventModal';

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
  const date = selectedDate || new Date();

  const { isAuthenticated, isAdmin } = useAuth();

  const modalDisclosure = useDisclosure();

  const selectedEvents = events.filter((event) =>
    isSameDate(event.date, date)
  );

  const formattedDate = format(date, 'dd/MM');

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

            {isAuthenticated && !isAdmin && (
              <>
                <Button mt="4" w="full" onClick={modalDisclosure.onOpen}>
                  Iniciar um Evento
                </Button>

                <CreateEventModal
                  events={selectedEvents}
                  date={date}
                  {...modalDisclosure}
                />
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
