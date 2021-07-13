import React from 'react';
import { Box } from '@chakra-ui/react';
import { func, bool } from 'prop-types';
import { CgClose, CgMenu } from 'react-icons/cg';

const MenuToggle = ({ toggle, isOpen }) => (
  <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
    {isOpen ? <CgClose /> : <CgMenu />}
  </Box>
);

MenuToggle.propTypes = {
  toggle: func.isRequired,
  isOpen: bool.isRequired,
};

export default MenuToggle;
