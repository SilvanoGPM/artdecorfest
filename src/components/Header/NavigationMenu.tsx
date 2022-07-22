import {
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

type NavigationMenuProps = Omit<DrawerProps, 'children'>;

export function NavigationMenu(props: NavigationMenuProps) {
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
              <Link>Meus eventos</Link>
              <Link>Gerenciar eventos</Link>
              <Link>Sair</Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
