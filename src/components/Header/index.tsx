import {
  Box,
  Flex,
  IconButton,
  Icon,
  useDisclosure,
  Button,
  Image,
  Avatar,
  Spacer,
} from '@chakra-ui/react';

import { BiLogIn, BiMenu } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

import { NavigationMenu } from './NavigationMenu';

export function Header() {
  const { isAuthenticated, user } = useAuth();
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
        {isAuthenticated ? (
          <Box>
            <IconButton
              aria-label="Abrir Navegação"
              onClick={disclosure.onOpen}
              icon={<Icon as={BiMenu} fontSize="3xl" />}
            />
          </Box>
        ) : (
          <Spacer />
        )}

        {isAuthenticated ? (
          <Avatar
            src={user?.photoURL!}
            name={user?.displayName!}
            maxW="12"
            rounded="full"
          />
        ) : (
          <NavLink to="/login">
            <Button leftIcon={<Icon as={BiLogIn} />}>Entrar</Button>
          </NavLink>
        )}
      </Flex>

      <NavigationMenu {...disclosure} />
    </>
  );
}
