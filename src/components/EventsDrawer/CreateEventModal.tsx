import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  ModalProps,
  Box,
  Text,
  Badge,
  Icon,
  Center,
} from '@chakra-ui/react';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MdDateRange } from 'react-icons/md';

import { CreateEventForm } from './CreateEventForm';

export interface Event {
  id: string;
  title: string;
  date: Date;
  start: string;
  end: string;
}

interface CreateEventModalProps extends Omit<ModalProps, 'children'> {
  events: Event[];
  date: Date;
}

export function CreateEventModal({
  events,
  date,
  ...props
}: CreateEventModalProps) {
  const formattedDate = format(date, "dd 'de' MMMM, yyyy", { locale: ptBR });

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent mx="2">
        <ModalHeader>
          <Flex align="center" justify="space-between">
            <Text>Iniciar evento</Text>

            <ModalCloseButton pos="static" />
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Box textAlign="right">
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

            <CreateEventForm
              events={events}
              date={date}
              closeModal={props.onClose}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
