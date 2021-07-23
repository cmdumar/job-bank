import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Box>
      <Link to="/">
        <Text fontSize="2xl" fontWeight="bold">
          Job Bank
        </Text>
      </Link>
    </Box>
  );
}
