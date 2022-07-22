import { Box, Text } from '@chakra-ui/react';

import { pluralize } from '../../utils/pluralize';

interface EventsCounterProps {
  total: number;
}

export function EventsCounter({ total }: EventsCounterProps) {
  return (
    <Box
      rounded="full"
      bg="orange.100"
      pr="2"
      pl="10"
      py="1"
      w="fit-content"
      pos="relative"
    >
      <Text
        rounded="full"
        textAlign="center"
        p="1"
        w="8"
        h="8"
        bg="orange.300"
        pos="absolute"
        left="0"
        top="0"
      >
        {total}
      </Text>{' '}
      {pluralize(total, 'Evento', 'Eventos', false)}
    </Box>
  );
}
