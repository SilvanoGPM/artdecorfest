import { Box, Flex, Text } from '@chakra-ui/react';

import { stepLine, stepLineShort } from '../../styles/stepLine';

import { Event } from '.';

interface EventsListProps {
  events: Event[];
}

export function EventsList({ events }: EventsListProps) {
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

          <Flex direction="column" ml="2">
            <Text>{event.title}</Text>
            <Text as="small" color="orange.500">
              {event.start} / {event.end}
            </Text>
          </Flex>
        </Flex>
      ))}
    </>
  );
}
