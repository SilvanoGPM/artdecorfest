import { Box, Flex, Spacer, Text } from '@chakra-ui/react';

import { stepLine, stepLineShort } from '../../styles/stepLine';
import { RemoveEventPopover } from './RemoveEventPopover';
import { Event } from '.';
import { useAuth } from '../../contexts/AuthContext';

interface EventsListProps {
  events: Event[];
}

export function EventsList({ events }: EventsListProps) {
  const { isAdmin } = useAuth();

  return (
    <>
      {events.map((event, index) => (
        <Flex
          key={event.id}
          mt="45px"
          ml="2"
          transform="translateX(-4px)"
          align="center"
        >
          <Box
            w="6"
            h="6"
            rounded="full"
            bg="orange.300"
            pos="relative"
            sx={index === 0 ? stepLineShort : stepLine}
          />

          <Flex ml="2" w="full">
            <Flex direction="column">
              <Text>{event.title}</Text>

              <Text as="small" color="orange.500">
                {event.start} / {event.end}
              </Text>
            </Flex>

            <Spacer />

            {isAdmin && <RemoveEventPopover event={event} />}
          </Flex>
        </Flex>
      ))}
    </>
  );
}
