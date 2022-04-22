import "./style.scss";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { formatMoney } from "../../utils";
import Rating from "../Rating";
import { addToCart } from "../../store/Slice/cartSlice";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Carousel } from "react-carousel-minimal";

function ProductDetail() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const location = useLocation();
  const {
    id,
    title,
    description,
    thumbnail,
    images,
    price,
    rating,
    brand,
    breadcrumbs,
  } = location.state;

  function handleAddToCart(product) {
    dispatch(addToCart(product));
  }

  return (
    <div className="product-detail">
      <Container>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          className="py-3"
        >
          <Link underline="hover" color="inherit" href="/">
            {t("home")}
          </Link>
          {breadcrumbs && (
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate(-1)}
            >
              {breadcrumbs}
            </Link>
          )}
          <Typography color="text.primary">{title}</Typography>
        </Breadcrumbs>

        <Row className="product-content">
          <Col md={4}>
            <div className="product__images pt-2">
              <Carousel
                data={images.map((url) => ({ image: url }))}
                width="415px"
                max-height="415px"
                slideImageFit="fill"
                slideBackgroundColor="white"
                thumbnails={true}
                thumbnailWidth="100px"
                style={{
                  textAlign: "center",
                  margin: "5px auto",
                }}
              />
            </div>
          </Col>
          <Col md={8}>
            <div className="product ps-3">
              <h2 className="product__title fw-bold pt-4">{title}</h2>
              <p className="product__desc py-3">{description}</p>
              <span className="product__rating py-3">{Rating(rating)}</span>
              <div className="product__brand py-3">Brand: {brand}</div>
              <div className="product__price py-3">{formatMoney(price)}</div>
              <div className="product__quantity py-3">
                <Button
                  onClick={() => setValue((quantity) => +quantity - 1)}
                  variant="secondary rounded-0"
                  size="sm"
                  disabled={value === 1}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <input
                  type="number"
                  min="1"
                  value={value}
                  onChange={(event) => setValue(+event.target.value)}
                />
                <Button
                  onClick={() => setValue((quantity) => +quantity + 1)}
                  variant="secondary rounded-0"
                  size="sm"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
              <Button
                variant="outline product__cart py-2 my-3"
                onClick={() =>
                  handleAddToCart({
                    id,
                    title,
                    thumbnail,
                    price,
                    quantity: value,
                  })
                }
              >
                {t("add to cart")}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetail;
