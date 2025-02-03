import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from '../ui/pagination';

const MainPagination = () => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink>01</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>02</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>03</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MainPagination;
