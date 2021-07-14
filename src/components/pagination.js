import { number, func } from 'prop-types';
import { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

const Pagination = ({
  handlePageChange,
  dataLimit,
  totalData,
}) => {
  const [pages] = useState(Math.round(totalData / dataLimit));
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);

  console.log('Offset', offset);

  const goToNextPage = () => {
    setOffset((offset) => offset + 15);
    setCurrentPage((page) => page + 1);
    handlePageChange(offset);
  };

  const goToPreviousPage = () => {
    setOffset((offset) => offset - 15);
    setCurrentPage((page) => page - 1);
    handlePageChange(offset);
  };

  // eslint-disable-next-line no-unused-vars
  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setOffset(pageNumber * 15);
    setCurrentPage(pageNumber);
    handlePageChange(offset);
  };

  return (
    <Box>
      <Button onClick={() => goToPreviousPage()}>
        Prev Page
      </Button>
      <Button onClick={() => goToNextPage()}>
        Next Page
      </Button>
      <Text>{pages}</Text>
    </Box>
  );
};

Pagination.propTypes = {
  handlePageChange: func.isRequired,
  dataLimit: number.isRequired,
  totalData: number.isRequired,
};

export default Pagination;
