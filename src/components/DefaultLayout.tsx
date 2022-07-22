import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

import { Header } from './Header';

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />

      <Box as="main" maxW="1300px" mx="auto" mt="8" px="4">
        {children}
      </Box>
    </>
  );
}
