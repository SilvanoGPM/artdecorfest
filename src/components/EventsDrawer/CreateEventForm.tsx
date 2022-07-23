import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { isWithinInterval } from 'date-fns';
import { Timestamp } from '@firebase/firestore';
import { setTimeInDate } from '../../utils/setTimeInDate';
import { Input } from '../form/Input';
import { Event } from './CreateEventModal';
import { createPreEvent } from '../../services/firebase/preEvents';
import { useAuth } from '../../contexts/AuthContext';
import { addUserPhone } from '../../services/firebase/users';

interface CreateEventFormProps {
  events: Event[];
  date: Date;
  closeModal: () => void;
}

interface CreateEventFormData {
  title: string;
  start: string;
  end: string;
  phone: string;
}

export function CreateEventForm({
  events,
  date,
  closeModal,
}: CreateEventFormProps) {
  const { user, info } = useAuth();
  const toast = useToast();
  const { register, handleSubmit, formState } = useForm<CreateEventFormData>();

  const handleCreateEvent = handleSubmit(async (data) => {
    try {
      if (!info?.phone) {
        await addUserPhone(info?.id!, data.phone.replaceAll(/\D+/g, ''));
      }

      await createPreEvent(user?.id || '', {
        ...data,
        date: Timestamp.fromDate(date),
      });

      toast({
        status: 'success',
        title: 'Evento enviado para administração',
        description:
          'Aguarde a administração entrar em contato para confirmar seu evento',
      });

      closeModal();
    } catch {
      toast({ status: 'error', title: 'Não foi possível iniciar o evento' });
    }
  });

  function timeValidation(message: string) {
    return {
      hasEventsInPeriod: (startTime: string) => {
        const startDate = setTimeInDate(date, startTime);

        function hasEventInInterval({
          start,
          end,
        }: {
          start: string;
          end: string;
        }) {
          const startInnerDate = setTimeInDate(date, start);
          const endInnerDate = setTimeInDate(date, end);

          const interval = { start: startInnerDate, end: endInnerDate };

          if (isWithinInterval(startDate, interval)) {
            return message;
          }

          return false;
        }

        for (const event of events) {
          const hasEvent = hasEventInInterval(event);

          if (hasEvent) {
            return hasEvent;
          }
        }

        return true;
      },
    };
  }

  const formValidations = {
    title: {
      required: 'Insira um título',
      minLength: { value: 3, message: 'Insira pelo menos 3 caracteres' },
    },
    phone: { required: 'É necessário um número para entrarmos em contato' },
    start: {
      required: 'Insira uma data de início',
      validate: timeValidation(
        'Um evento vai estar ocorrendo na data de ínicio'
      ),
    },
    end: {
      required: 'Insira uma data de término',
      validate: timeValidation(
        'Um evento vai estar ocorrendo na data de término'
      ),
    },
  };

  return (
    <Box as="form" onSubmit={handleCreateEvent}>
      <VStack spacing="4">
        <Input
          {...register('title', formValidations.title)}
          error={formState.errors.title}
          label="Título"
          placeholder="ex: Casamento"
        />

        <SimpleGrid minChildWidth="150px" w="full" spacing="4">
          <Input
            {...register('start', formValidations.start)}
            type="time"
            label="Início"
            error={formState.errors.start}
            flex="1"
          />

          <Input
            {...register('end', formValidations.end)}
            type="time"
            label="Término"
            error={formState.errors.end}
            flex="1"
          />
        </SimpleGrid>

        {!info?.phone && (
          <Input
            {...register('phone', formValidations.phone)}
            error={formState.errors.phone}
            label="Número para contato"
            placeholder="ex: 88 9 88888888"
          />
        )}
      </VStack>

      <HStack spacing="4" mt="4" justify="flex-end" w="full">
        <Button
          colorScheme="red"
          onClick={closeModal}
          isLoading={formState.isSubmitting}
        >
          Cancelar
        </Button>

        <Button type="submit" isLoading={formState.isSubmitting}>
          Iniciar
        </Button>
      </HStack>
    </Box>
  );
}
