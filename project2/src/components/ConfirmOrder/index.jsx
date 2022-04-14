import { Col, Container, Row } from "react-bootstrap";
import OrderSummary from "../Cart/OrderSummary";
import ShippingAddress from "./ShippingAddress";
import CartInfo from "./CartInfo";
import PaymentMethod from "./PaymentMethod";
import { useDispatch } from "react-redux";
import { deleteAllProduct, setOrder } from "../../store/Slice/cartSlice";
import { getDataFromLocalStorage } from "../../utils";

function ConfirmOrder() {
  const dispatch = useDispatch();
  const cart = getDataFromLocalStorage("cart");
  const { products } = cart;

  const handleClick = () => {
    dispatch(setOrder({ ...products }));
    dispatch(deleteAllProduct());
  };

  return (
    <section className="cart">
      <Container>
        <Row>
          <Col lg={8}>
            <ShippingAddress />
            <CartInfo />
          </Col>
          <Col lg={4}>
            <PaymentMethod />
            <OrderSummary label="order" link="/" onClick={handleClick} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ConfirmOrder;
