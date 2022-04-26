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
              iPhone 13 Pro Max 128 GB - siêu phẩm được mong chờ nhất ở nửa cuối
              năm 2021 đến từ Apple. Máy có thiết kế không mấy đột phá khi so
              với người tiền nhiệm, bên trong đây vẫn là một sản phẩm có màn
              hình siêu đẹp, tần số quét được nâng cấp lên 120 Hz mượt mà, cảm
              biến camera có kích thước lớn hơn, cùng hiệu năng mạnh mẽ với sức
              mạnh đến từ Apple A15 Bionic, sẵn sàng cùng bạn chinh phục mọi thử
              thách.
            </p>
            <img
              className="py-3 w-75 d-block m-auto"
              src="https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-max-3.jpg"
              alt={title}
            ></img>
            <p>
              Với iPhone 13 Pro Max phần tai thỏ đã được thu gọn lại 20% so với
              thế hệ trước, không chỉ giải phóng nhiều không gian hiển thị hơn
              mà còn giúp mặt trước chiếc điện thoại trở nên hấp dẫn hơn mà vẫn
              đảm bảo được hoạt động của các cảm biến.
            </p>
            <img
              className="py-3 w-75 d-block m-auto"
              src="https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-max-2.jpg"
              alt={title}
            ></img>
            <p>
              Điểm thay đổi dễ dàng nhận biết trên iPhone 13 Pro Max chính là
              kích thước của cảm biến camera sau được làm to hơn và để tăng độ
              nhận diện cho sản phẩm mới thì Apple cũng đã bổ sung một tùy chọn
              màu sắc Sierra Blue (màu xanh dương nhạt hơn so với Pacific Blue
              của iPhone 12 Pro Max).
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
