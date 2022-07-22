import { extendTheme } from '@chakra-ui/react';
import '@fontsource/roboto';

export const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'orange',
      },
    }
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
});
