import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MenuItem = ({
  children, to,
}) => (
  <Link to={`${to}`} display="block" width="100%">
    <Text display="block">
      {children}
    </Text>
  </Link>
);

MenuItem.propTypes = {
  children: PropTypes
    .oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  to: PropTypes.string,
};

MenuItem.defaultProps = {
  to: '/',
};

export default MenuItem;
