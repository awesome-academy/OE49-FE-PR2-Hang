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
  const { products } = getDataFromLocalStorage("cart");
  const { id, username, email, phone, address } =
    getDataFromLocalStorage("payment-info");

  const handleClick = () => {
    dispatch(
      setOrder({ userId: id, username, email, phone, address, products })
    );
    dispatch(deleteAllProduct());
    localStorage.removeItem("cart");
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
            <OrderSummary label="order" link="/profile" onClick={handleClick} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ConfirmOrder;
