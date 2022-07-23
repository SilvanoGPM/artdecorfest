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
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface AcceptEventPopoverProps {
  onAcceptEvent: () => void;
}

export function AcceptEventPopover({ onAcceptEvent }: AcceptEventPopoverProps) {
  const disclosure = useDisclosure();

  return (
    <Popover {...disclosure} placement="left-end">
      <PopoverTrigger>
        <IconButton
          aria-label="Aceitar evento"
          variant="unstyled"
          icon={
            <Icon as={AiOutlineCheckCircle} color="green.500" fontSize="3xl" />
          }
        />
      </PopoverTrigger>

      <Portal>
        <PopoverContent>
          <PopoverHeader>
            <Flex align="center" justify="space-between">
              Aceitar evento
              <PopoverCloseButton pos="static" />
            </Flex>
          </PopoverHeader>

          <PopoverBody>Tem certeza que deseja aceitar este evento?</PopoverBody>

          <PopoverFooter>
            <HStack spacing="2" justify="end">
              <Button onClick={disclosure.onClose}>Não</Button>
              <Button onClick={onAcceptEvent}>Sim</Button>
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
