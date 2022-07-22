import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Flex,
  Link,
  VStack,
} from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type NavigationMenuProps = Omit<DrawerProps, 'children'>;

export function NavigationMenu(props: NavigationMenuProps) {
  const { logout, isAuthenticated } = useAuth();

  return (
    <Drawer {...props} placement="left">
      <DrawerOverlay>
        <DrawerContent bg="orange.700" color="white">
          <DrawerHeader>
            <Flex align="center" justify="space-between">
              Navegação
              <DrawerCloseButton pos="static" />
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing="4" align="start">
              <Link as={NavLink} to="/meus-eventos">
                Meus eventos
              </Link>
              <Link as={NavLink} to="/gerenciar-eventos">
                Gerenciar eventos
              </Link>

              {isAuthenticated && (
                <Button colorScheme="red" onClick={logout}>
                  Sair
                </Button>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
