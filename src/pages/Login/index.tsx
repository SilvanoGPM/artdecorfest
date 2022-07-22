import { Box, Button, Center, Heading, Icon, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

export function Login() {
  const { handleLogin, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate, isAuthenticated]);

  return (
    <Center h="100vh">
      <Box maxW="400px" w="100%">
        <Heading fontSize="2xl" as="h2" mb="4" textAlign="center">
          Entrar Com
        </Heading>

        <VStack spacing="4">
          <Button
            onClick={() => handleLogin('google')}
            w="full"
            colorScheme="gray"
            isLoading={isLoading}
            leftIcon={<Icon as={FcGoogle} />}
          >
            Google
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
