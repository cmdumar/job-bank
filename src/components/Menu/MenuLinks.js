import { Box, Stack, useColorModeValue } from '@chakra-ui/react';
import { bool } from 'prop-types';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import MenuItem from './MenuItem';

const MenuLinks = ({ isOpen }) => {
  const bg = useColorModeValue('gray.800', 'white');
  const color = useColorModeValue('white', 'gray.800');

  return (
    <Box
      bg={isOpen && bg}
      color={isOpen && color}
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
      p={4}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Jobs</MenuItem>
        <MenuItem to="/profiles">People</MenuItem>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Stack>
    </Box>
  );
};

MenuLinks.propTypes = {
  isOpen: bool.isRequired,
};

export default MenuLinks;
