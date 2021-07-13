import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { string } from 'prop-types';

export default function Logo({ w }) {
  return (
    <Box w={w}>
      <Text fontSize="lg" fontWeight="bold">
        Job Bank
      </Text>
    </Box>
  );
}

Logo.propTypes = {
  w: string,
};

Logo.defaultProps = {
  w: '',
};
