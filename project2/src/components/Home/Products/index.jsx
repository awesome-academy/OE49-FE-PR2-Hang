import "./style.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/Slice/productSlice";
import ProductItem from "./ProductItem";
import { Col, Container, Row } from "react-bootstrap";
import PaginationComponent from "../../Pagination";
import Sidebar from "../Sidebar";

function Products() {
  const { isLoading, products, filter, totalCount } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(filter));
  }, [filter, dispatch]);

  return (
    <main className="content">
      <Container>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10}>
            <h1 className="title">Sản phẩm nổi bật</h1>
            <p className="pb-4">{totalCount} sản phẩm phù hợp</p>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3 product__list">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                products.map((product) => (
                  <ProductItem key={product.id} {...product} />
                ))
              )}
            </div>
          </Col>
        </Row>
        <PaginationComponent totalCount={totalCount} filter={filter} />
      </Container>
    </main>
  );
}

export default Products;
