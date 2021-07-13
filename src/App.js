import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import Routes from './components/Routes';
import NavBar from './components/Menu/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Routes />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
