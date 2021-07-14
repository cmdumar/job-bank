import { useState } from 'react';

const Pagination = ({
  data, RenderComponent, title, pageLimit, dataLimit,
}) => {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage((page) => state + 15);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => state - 15);
  };

  return (
    <div>Hello</div>
  );
};

export default Pagination;
