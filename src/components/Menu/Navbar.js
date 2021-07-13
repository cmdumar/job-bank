import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Logo from './Logo';
import MenuToggle from './MenuToggle';
import NavBarContainer from './NavbarContainer';
import MenuLinks from './MenuLinks';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer>
      <Logo
        w="100px"
      />
      <Box display="flex" alignItems="center">
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
    </NavBarContainer>
  );
};

export default NavBar;
