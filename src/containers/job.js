import { useState } from 'react';
import { Container, Box, Text } from '@chakra-ui/react';

const Job = () => {
  const [title, setTitle] = useState('Front-End Dev');

  console.log('title', title);
  console.log('set', setTitle);

  return (
    <Container>
      <Box>
        <Text>Front-End Developer</Text>
      </Box>
    </Container>
  );
};

export default Job;
