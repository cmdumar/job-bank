import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import NavBar from './components/Menu/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Text>
              Edit
              {' '}
              <Code fontSize="xl">src/App.js</Code>
              {' '}
              and save to reload.
            </Text>
            <Link
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
