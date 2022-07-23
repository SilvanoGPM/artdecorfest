import { Center, Heading, Spinner, Text, useToast, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentReference } from 'firebase/firestore';
import { Timestamp } from '@firebase/firestore';

import { DefaultLayout } from '../../components/DefaultLayout';
import { PreEventCard } from '../../components/PreEventCard';
import { useAuth } from '../../contexts/AuthContext';
import { usePreEvents } from './usePreEvents';
import { User } from '../../services/firebase/users';
import { createEvent } from '../../services/firebase/events';
import { removePreEvent } from '../../services/firebase/preEvents';

export interface PreEvent {
  id: string;
  userRef: DocumentReference<User>;
  user: User;
  title: string;
  start: string;
  end: string;
  date: Date;
  formattedDate: string;
}

export function PreEvents() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const [preEvents, isLoading] = usePreEvents();
  const toast = useToast();

  async function handleAcceptEvent(event: PreEvent) {
    try {
      await createEvent({ ...event, date: Timestamp.fromDate(event.date) });
      await removePreEvent(event.id);
      toast({ status: 'success', title: 'Evento aceitado com sucesso' });
    } catch {
      toast({ status: 'error', title: 'Não foi possível aceitar o evento' });
    }
  }

  async function handleDenyEvent(event: PreEvent) {
    try {
      await removePreEvent(event.id);
      toast({ status: 'success', title: 'Evento rejeitado com sucesso' });
    } catch {
      toast({ status: 'error', title: 'Não foi possível rejeitar o evento' });
    }
  }

  return (
    <DefaultLayout>
      <Center mt="8" flexDirection="column" flex="1" w="full">
        <Heading as="h2" mb="8">
          Aprovar Eventos
        </Heading>

        {isLoading ? (
          <Spinner size="lg" color="orange" />
        ) : (
          <>
            {preEvents.length > 0 ? (
              <VStack spacing="8" mb="8" flex="1" w="full">
              {preEvents.map((event) => (
                <PreEventCard
                  key={event.id}
                  onAcceptEvent={() => handleAcceptEvent(event)}
                  onDenyEvent={() => handleDenyEvent(event)}
                  {...event}
                />
              ))}
            </VStack>
            ) : (
              <Text>Nenhum evento para confirmar</Text>
            )}
          </>
        )}
      </Center>
    </DefaultLayout>
  );
}
