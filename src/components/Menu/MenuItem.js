import { Text, Link } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const MenuItem = ({
  children, to,
}) => (
  <Link href={to}>
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
