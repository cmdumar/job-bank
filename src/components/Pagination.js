/* eslint-disable react/prop-types */
import { IconContext } from 'react-icons';
import { Container, Text } from '@chakra-ui/react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import {
  Paginator,
  Previous,
  Next,
} from 'chakra-paginator';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
  <Paginator
    currentPage={currentPage}
    pagesQuantity={totalPages}
    onPageChange={setCurrentPage}
  >
    <Container display="flex" justifyContent="space-between" w="full" p={4}>
      <Previous>
        <IconContext.Provider value={{ className: 'pagination-btn' }}>
          <GrFormPrevious />
        </IconContext.Provider>
        <Text>
          Previous
        </Text>
      </Previous>
      <Next>
        <Text>
          Next
        </Text>
        <IconContext.Provider value={{ className: 'pagination-btn' }}>
          <GrFormNext />
        </IconContext.Provider>
      </Next>
    </Container>
  </Paginator>
);

export default Pagination;
