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
import { AiOutlineBell, AiOutlineClockCircle } from 'react-icons/ai';

import { MdDateRange } from 'react-icons/md';
import { AcceptEventPopover } from './AcceptEventPopover';
import { DenyEventPopover } from './DenyEventPopover';

interface PreEventCardProps {
  user: { displayName?: string | null; photoURL?: string | null };
  title: string;
  phone?: string | null;
  formattedDate: string;
  start: string;
  end: string;
  onAcceptEvent: () => void;
  onDenyEvent: () => void;
}

export function PreEventCard({
  user,
  title,
  formattedDate,
  start,
  end,
  phone,
  onAcceptEvent,
  onDenyEvent,
}: PreEventCardProps) {
  function handleSendMessage() {
    if (!phone) {
      return;
    }

    const url = 'https://wa.me/';

    const firstName = user.displayName?.split(' ')[0] || 'Sr(a)';

    const message = `Olá, ${firstName}. Eu faço parte da equipe ArtDecorFest. Vamos negociar sobre sua festa(${title}) no dia ${formattedDate}, das ${start} às ${end}.`;

    window.open(`${url}${phone.replaceAll(' ', '').trim()}?text=${message}`);
  }

  return (
    <Flex
      direction="column"
      bg="orange.100"
      rounded="xl"
      maxW="500px"
      w="full"
      flex="1"
    >
      <Flex
        align="center"
        flex="1"
        borderBottom="1px"
        borderBottomColor="orange.300"
        p="4"
      >
        <Avatar
          name={String(user.displayName)}
          src={String(user.photoURL)}
          mr="4"
        />
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
            onClick={handleSendMessage}
            variant="unstyled"
            icon={<Icon as={BsWhatsapp} color="whatsapp.500" fontSize="3xl" />}
          />
        </Tooltip>

        <DenyEventPopover onDenyEvent={onDenyEvent} />

        <AcceptEventPopover onAcceptEvent={onAcceptEvent} />
      </Flex>
    </Flex>
  );
}
