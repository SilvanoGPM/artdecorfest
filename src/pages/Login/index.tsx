import { Box, Button, Center, Heading, Icon, VStack } from '@chakra-ui/react';

import { FcGoogle } from 'react-icons/fc';

export function Login() {
  return (
    <Center h="100vh">
      <Box maxW="400px" w="100%">
        <Heading fontSize="2xl" as="h2" mb="4" textAlign="center">
          Entrar Com
        </Heading>

        <VStack spacing="4">
          <Button w="full" colorScheme="gray" leftIcon={<Icon as={FcGoogle} />}>
            Google
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
