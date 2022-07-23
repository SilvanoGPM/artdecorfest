import { Center, Heading, Spinner, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultLayout } from '../../components/DefaultLayout';
import { PreEventCard } from '../../components/PreEventCard';
import { useAuth } from '../../contexts/AuthContext';
import { usePreEvents } from './usePreEvents';

export function PreEvents() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const [preEvents, isLoading] = usePreEvents();

  return (
    <DefaultLayout>
      <Center mt="8" flexDirection="column">
        <Heading as="h2" mb="8">
          Aprovar Eventos
        </Heading>

        {isLoading ? (
          <Spinner size="lg" color="orange" />
        ) : (
          <VStack spacing="8">
            {preEvents.map((event) => (
              <PreEventCard key={event.id} {...event} />
            ))}
          </VStack>
        )}
      </Center>
    </DefaultLayout>
  );
}
