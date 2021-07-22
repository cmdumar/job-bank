import {
  Box, Stack, Input,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { bool } from 'prop-types';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import MenuItem from './MenuItem';
import setSearchInput from '../../redux/actions/search';

const MenuLinks = ({ isOpen }) => {
  const value = useSelector((state) => state.search);

  const dispatch = useDispatch();

  const handleSearch = (event) => {
    dispatch(setSearchInput(event.target.value));
  };

  return (
    <Box
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
        <Input placeholder="Search..." value={value} onChange={handleSearch} size="sm" />
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
