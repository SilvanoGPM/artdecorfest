import {
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useBoolean,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { BiTrash } from 'react-icons/bi';

import { removeEvent } from '../../services/firebase/events';

interface RemoveEventPopoverProps {
  event: { id: string; title: string };
}

export function RemoveEventPopover({ event }: RemoveEventPopoverProps) {
  const disclosure = useDisclosure();
  const toast = useToast();
  const [removing, setRemoving] = useBoolean();

  async function handleRemoveEvent() {
    setRemoving.on();

    try {
      await removeEvent(event.id);

      toast({ status: 'success', title: 'Evento removido com sucesso' });

      disclosure.onClose();
    } catch {
      toast({ status: 'error', title: 'Não foi possível remover evento' });
    } finally {
      setRemoving.off();
    }
  }

  return (
    <Popover {...disclosure} placement="left">
      <PopoverTrigger>
        <IconButton
          aria-label="Remover evento"
          variant="unstyled"
          icon={<Icon as={BiTrash} />}
          _hover={{ color: 'red.500' }}
        />
      </PopoverTrigger>

      <Portal>
        <PopoverContent maxW="220px">
          <PopoverHeader>
            <Flex align="center" justify="space-between">
              Remover evento?
              <PopoverCloseButton pos="static" />
            </Flex>
          </PopoverHeader>

          <PopoverBody>
            Tem certeza que deseja remover o evento{' '}
            <strong>{event.title}</strong>?
          </PopoverBody>

          <PopoverFooter>
            <HStack spacing="2" justify="end">
              <Button
                isLoading={removing}
                colorScheme="red"
                onClick={disclosure.onClose}
              >
                Não
              </Button>

              <Button isLoading={removing} onClick={handleRemoveEvent}>
                Sim
              </Button>
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
