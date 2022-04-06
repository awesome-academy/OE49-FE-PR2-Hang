import "./style.scss";
import { Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setPagination } from "../../store/Slice/productSlice";

function PaginationComponent(props) {
  const { totalCount, filter } = props;
  const dispatch = useDispatch();

  const pageCount = Math.ceil(totalCount / filter._limit);
  const page = filter._page;
  const left = page - 2;
  const right = page + 2;

  const getPages = () => {
    if (pageCount < 5) return [...Array(pageCount).keys()].slice(2);

    const pages = [];
    for (let i = 2; i < pageCount; i++) {
      if (i >= left && (i <= right)) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <section className="section__pagination">
      {pageCount && (
        <Pagination>
          <Pagination.Prev
            onClick={() => dispatch(setPagination(page - 1))}
            disabled={page === 1}
          />

          <Pagination.Item
            active={page === 1}
            onClick={() => dispatch(setPagination(1))}
          >
            {1}
          </Pagination.Item>

          <Pagination.Ellipsis
            hidden={page < 5}
            onClick={() => dispatch(setPagination(page - 5))}
          />

          {getPages().map((item, index) => (
            <Pagination.Item
              key={index}
              active={page === item}
              onClick={() => dispatch(setPagination(item))}
            >
              {item}
            </Pagination.Item>
          ))}

          <Pagination.Ellipsis
            hidden={page > pageCount - 4}
            onClick={() => dispatch(setPagination(page + 5))}
          />

          <Pagination.Item
            hidden={pageCount === 1}
            active={page === pageCount}
            onClick={() => dispatch(setPagination(pageCount))}
          >
            {pageCount}
          </Pagination.Item>

          <Pagination.Next
            onClick={() => dispatch(setPagination(page + 1))}
            disabled={page === pageCount}
          />
        </Pagination>
      )}
    </section>
  );
}

export default PaginationComponent;
