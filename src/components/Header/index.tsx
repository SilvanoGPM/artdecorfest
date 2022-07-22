import {
  Box,
  Flex,
  IconButton,
  Icon,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

import { BiLogIn, BiMenu } from 'react-icons/bi';
import { NavigationMenu } from './NavigationMenu';

export function Header() {
  const disclosure = useDisclosure();

  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        h="20"
        w="100%"
        bg="orange.500"
        px="4"
      >
        <Box>
          <IconButton
            aria-label="Abrir Navegação"
            onClick={disclosure.onOpen}
            icon={<Icon as={BiMenu} fontSize="3xl" />}
          />
        </Box>

        <Button leftIcon={<Icon as={BiLogIn} />}>Entrar</Button>
      </Flex>

      <NavigationMenu {...disclosure} />
    </>
  );
}
