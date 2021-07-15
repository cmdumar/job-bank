import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

export default function Logo({ w }) {
  return (
    <Box w={w}>
      <Link to="/">
        <Text fontSize="lg" fontWeight="bold">
          Torre Job Bank
        </Text>
      </Link>
    </Box>
  );
}

Logo.propTypes = {
  w: string,
};

Logo.defaultProps = {
  w: '',
};
