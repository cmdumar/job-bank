import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';

const NavBarContainer = ({ children }) => (
  <Flex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    w="100%"
    mb={8}
    p={8}
  >
    {children}
  </Flex>
);

NavBarContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default NavBarContainer;
