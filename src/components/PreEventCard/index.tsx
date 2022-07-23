import {
  Avatar,
  Badge,
  Flex,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import { BsWhatsapp } from 'react-icons/bs';

import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineBell,
  AiOutlineClockCircle,
} from 'react-icons/ai';

import { MdDateRange } from 'react-icons/md';

interface PreEventCardProps {
  user: { displayName?: string | null; photoURL?: string | null };
  title: string;
  formattedDate: string;
  start: string;
  end: string;
}

export function PreEventCard({
  user,
  title,
  formattedDate,
  start,
  end
}: PreEventCardProps) {
  return (
    <Flex
      direction="column"
      bg="orange.100"
      rounded="xl"
      maxW="500px"
      w="500px"
    >
      <Flex
        align="center"
        flex="1"
        borderBottom="1px"
        borderBottomColor="orange.300"
        p="4"
      >
        <Avatar name={String(user.displayName)} src={String(user.photoURL)} mr="4" />
        <Text color="orange.900">{user.displayName}</Text>
      </Flex>

      <Flex
        direction="column"
        flex="1"
        px="4"
        py="8"
        borderBottom="1px"
        borderBottomColor="orange.300"
      >
        <Badge
          colorScheme="orange"
          fontSize="xl"
          mb="4"
          display="inline-flex"
          alignItems="center"
        >
          <Icon as={MdDateRange} mr="2" />
          {formattedDate}
        </Badge>

        <Text
          fontSize="2xl"
          color="orange.900"
          fontWeight="bold"
          display="inline-flex"
          alignItems="center"
          mb="4"
        >
          <Icon as={AiOutlineBell} mr="2" />
          {title}
        </Text>

        <Text
          fontSize="xl"
          color="orange.900"
          fontWeight="bold"
          display="inline-flex"
          alignItems="center"
        >
          <Icon as={AiOutlineClockCircle} mr="2" />
          Das {start} até {end}.
        </Text>
      </Flex>

      <Flex justify="end" pt="2" px="4">
        <Tooltip label="Enviar mensagem">
          <IconButton
            aria-label="Enviar mensagem"
            variant="unstyled"
            icon={<Icon as={BsWhatsapp} color="whatsapp.500" fontSize="3xl" />}
          />
        </Tooltip>

        <Tooltip label="Negar evento">
          <IconButton
            aria-label="Negar evento"
            variant="unstyled"
            icon={
              <Icon as={AiOutlineCloseCircle} color="red.300" fontSize="3xl" />
            }
          />
        </Tooltip>

        <Tooltip label="Aceitar evento">
          <IconButton
            aria-label="Aceitar evento"
            variant="unstyled"
            icon={
              <Icon
                as={AiOutlineCheckCircle}
                color="green.500"
                fontSize="3xl"
              />
            }
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
}
