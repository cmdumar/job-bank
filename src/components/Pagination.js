/* eslint-disable react/prop-types */
import { Container, Text } from '@chakra-ui/react';
import {
  Paginator,
  Previous,
  Next,
} from 'chakra-paginator';
import { func, number } from 'prop-types';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
  <Paginator
    currentPage={currentPage}
    pagesQuantity={totalPages}
    onPageChange={setCurrentPage}
  >
    <Container display="flex" justifyContent="space-between" w="full" p={4}>
      <Previous>
        <Text>
          Previous
        </Text>
      </Previous>
      <Next>
        <Text>
          Next
        </Text>
      </Next>
    </Container>
  </Paginator>
);

Pagination.propTypes = {
  currentPage: number.isRequired,
  totalPages: number.isRequired,
  setCurrentPage: func.isRequired,
};

export default Pagination;
