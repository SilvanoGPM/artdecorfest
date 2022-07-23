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
  useDisclosure,
} from '@chakra-ui/react';

import { AiOutlineCloseCircle } from 'react-icons/ai';

interface DenyEventPopoverProps {
  onDenyEvent: () => void;
}

export function DenyEventPopover({ onDenyEvent }: DenyEventPopoverProps) {
  const disclosure = useDisclosure();

  return (
    <Popover {...disclosure} placement="left-end">
      <PopoverTrigger>
        <IconButton
          aria-label="Negar evento"
          variant="unstyled"
          icon={
            <Icon as={AiOutlineCloseCircle} color="red.300" fontSize="3xl" />
          }
        />
      </PopoverTrigger>

      <Portal>
        <PopoverContent>
          <PopoverHeader>
            <Flex align="center" justify="space-between">
              Rejeitar evento
              <PopoverCloseButton pos="static" />
            </Flex>
          </PopoverHeader>

          <PopoverBody>
            Tem certeza que deseja rejeitar este evento?
          </PopoverBody>

          <PopoverFooter>
            <HStack spacing="2" justify="end">
              <Button onClick={disclosure.onClose}>Não</Button>
              <Button onClick={onDenyEvent}>Sim</Button>
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
