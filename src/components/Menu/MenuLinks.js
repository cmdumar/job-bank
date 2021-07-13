import { Box, Stack } from '@chakra-ui/react';
import { bool } from 'prop-types';
import MenuItem from './MenuItem';

const MenuLinks = ({ isOpen }) => (
  <Box
    display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
    flexBasis={{ base: '100%', md: 'auto' }}
  >
    <Stack
      spacing={8}
      align="center"
      justify={['center', 'space-between', 'flex-end', 'flex-end']}
      direction={['column', 'row', 'row', 'row']}
      pt={[4, 4, 0, 0]}
    >
      <MenuItem to="/">Jobs</MenuItem>
      <MenuItem to="/something">People</MenuItem>
    </Stack>
  </Box>
);

MenuLinks.propTypes = {
  isOpen: bool.isRequired,
};

export default MenuLinks;
