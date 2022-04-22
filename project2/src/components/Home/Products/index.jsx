import "./style.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/Slice/productSlice";
import ProductItem from "./ProductItem";
import { Col, Container, Row } from "react-bootstrap";
import PaginationComponent from "../../Pagination";
import Sidebar from "../Sidebar";
import Sort from "../../Filter/Sort";
import { useTranslation } from "react-i18next";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Products() {
  const { isLoading, products, filter, totalCount } = useSelector(
    (state) => state.productReducer
  );
  const breadcrumbs = filter.category_like;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchProducts(filter));
  }, [filter, dispatch]);

  return (
    <main className="content">
      <Container>
        {breadcrumbs && (
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link underline="hover" color="inherit" href="/">
              {t("home")}
            </Link>
            <Typography color="text.primary">{breadcrumbs}</Typography>
          </Breadcrumbs>
        )}

        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10} className="position-relative">
            <h1 className="title">{t("featured products")}</h1>
            <Sort />
            <p className="pb-4">
              {totalCount} {t("items found")}
            </p>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3 product__list">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                products.map((product) => (
                  <ProductItem
                    key={product.id}
                    {...product}
                    breadcrumbs={breadcrumbs}
                  />
                ))
              )}
            </div>
            <PaginationComponent totalCount={totalCount} filter={filter} />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Products;
