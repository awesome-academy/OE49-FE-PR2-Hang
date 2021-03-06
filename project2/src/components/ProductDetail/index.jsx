import "./style.scss";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { formatMoney } from "../../utils";
import Rating from "../Rating";
import { addToCart } from "../../store/Slice/cartSlice";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Carousel } from "react-carousel-minimal";
import { fetchProducts } from "../../store/Slice/productSlice";
import ProductItem from "../Home/Products/ProductItem";

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
  const { products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(fetchProducts({ brand_like: brand }));
  }, [brand, dispatch]);

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
        <Row>
          <Col md={9} className="bg-white mt-3 p-3">
            <h2 className="product__title fw-bold py-3">{title}</h2>
            <p>
              iPhone 13 Pro Max 128 GB - si??u ph???m ???????c mong ch??? nh???t ??? n???a cu???i
              n??m 2021 ?????n t??? Apple. M??y c?? thi???t k??? kh??ng m???y ?????t ph?? khi so
              v???i ng?????i ti???n nhi???m, b??n trong ????y v???n l?? m???t s???n ph???m c?? m??n
              h??nh si??u ?????p, t???n s??? qu??t ???????c n??ng c???p l??n 120 Hz m?????t m??, c???m
              bi???n camera c?? k??ch th?????c l???n h??n, c??ng hi???u n??ng m???nh m??? v???i s???c
              m???nh ?????n t??? Apple A15 Bionic, s???n s??ng c??ng b???n chinh ph???c m???i th???
              th??ch.
            </p>
            <img
              className="py-3 w-75 d-block m-auto"
              src="https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-max-3.jpg"
              alt={title}
            ></img>
            <p>
              V???i iPhone 13 Pro Max ph???n tai th??? ???? ???????c thu g???n l???i 20% so v???i
              th??? h??? tr?????c, kh??ng ch??? gi???i ph??ng nhi???u kh??ng gian hi???n th??? h??n
              m?? c??n gi??p m???t tr?????c chi???c ??i???n tho???i tr??? n??n h???p d???n h??n m?? v???n
              ?????m b???o ???????c ho???t ?????ng c???a c??c c???m bi???n.
            </p>
            <img
              className="py-3 w-75 d-block m-auto"
              src="https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-max-2.jpg"
              alt={title}
            ></img>
            <p>
              ??i????m thay ??????i d??? d??ng nh???n bi???t tr??n iPhone 13 Pro Max ch??nh la??
              k??ch th?????c c???a c???m bi???n camera sau ???????c l??m to h??n v?? ????? t??ng ?????
              nh???n di???n cho s???n ph???m m???i th?? Apple c??ng ???? b??? sung m???t t??y ch???n
              m??u s???c Sierra Blue (m??u xanh d????ng nh???t h??n so v???i Pacific Blue
              c???a iPhone 12 Pro Max).
            </p>
          </Col>
          <Col md={3} className="ps-3 pe-0">
            <div className="bg-white mt-3 p-3">
              <h2 className="product__title fw-bold py-3">{t("related products")}</h2>
              {products.map((product, index) => {
                return <ProductItem key={index} {...product} />;
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetail;
