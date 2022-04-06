import "./style.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/Slice/productSlice";
import ProductItem from "./ProductItem";
import { Container } from "react-bootstrap";

function Products() {
  const { isLoading, products, filter } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(filter));
  }, [filter, dispatch]);

  return (
    <main className="content">
      <Container>
        <h1 className="title">Sản phẩm nổi bật</h1>
        <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-3 product__list">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            products.map((product) => (
              <ProductItem key={product.id} {...product} />
            ))
          )}
        </div>
      </Container>
    </main>
  );
}

export default Products;
