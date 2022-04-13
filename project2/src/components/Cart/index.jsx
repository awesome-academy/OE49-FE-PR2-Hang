import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllProduct } from "../../store/Slice/cartSlice";
import { useTranslation } from "react-i18next";
import CartItem from "./CartItem";
import "./style.scss";
import { Link } from "react-router-dom";
import ModalComponent from "../Modal";
import { totalProducts } from "../../utils";
import { useToggle } from "../../hooks/useToggle";
import OrderSummary from "./OrderSummary";

function Cart() {
  const [show, setShow] = useToggle();
  const { products } = useSelector((state) => state.cartReducer);
  const total = totalProducts(products);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDeleteAll = () => {
    dispatch(deleteAllProduct());
    setShow(false);
  };

  return (
    <section className="cart">
      <Container>
        {total ? (
          <Row>
            <Col lg={8}>
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th colSpan={4} className="px-3">
                      {t("all products")} ({total} {t("product")})
                    </th>
                    <th>
                      <Button
                        variant="link cart__delete"
                        onClick={() => setShow(true)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} className="mx-2" />
                        {t("delete")}
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <CartItem key={product.id} {...product} />
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col lg={4}>
              <OrderSummary />
            </Col>
          </Row>
        ) : (
          <div className="text-center py-5">
            <p>{t("no product")}</p>
            <Link
              to="/"
              role="button"
              className="btn btn-outline-secondary rounded-0 m-4"
            >
              {t("continue shopping")}
            </Link>
          </div>
        )}
      </Container>

      <ModalComponent
        show={show}
        onHide={() => setShow(false)}
        title={t("modal title delete")}
        body={t("modal body delete all")}
        close={t("cancel")}
        action={t("delete")}
        handleClose={() => setShow(false)}
        handleAction={handleDeleteAll}
      />
    </section>
  );
}

export default Cart;
