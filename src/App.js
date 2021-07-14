import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import Routes from './components/Routes';
import NavBar from './components/Menu/Navbar';

const App = () => (
  <ChakraProvider theme={theme}>
    <NavBar />
    <Box>
      <Grid minH="100vh" p={3}>
        <Routes />
      </Grid>
    </Box>
  </ChakraProvider>
);

export default App;
