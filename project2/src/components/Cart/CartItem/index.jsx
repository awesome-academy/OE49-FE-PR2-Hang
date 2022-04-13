import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Button } from "react-bootstrap";
import { formatMoney } from "../../../utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, updateQuantity } from "../../../store/Slice/cartSlice";
import { useTranslation } from "react-i18next";
import ModalComponent from "../../Modal";
import { useShowModal } from "../../../hooks/useModal";

function CartItem(props) {
  const { id, title, thumbnail, price, quantity } = props;
  const [value, setValue] = useState(quantity);
  const [show, setShow] = useShowModal();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleDecrement = (id) => {
    setValue((quantity) => +quantity - 1);
    dispatch(updateQuantity({ id, quantity: +quantity - 1 }));
  };

  const handleIncrement = (id) => {
    setValue((quantity) => +quantity + 1);
    dispatch(updateQuantity({ id, quantity: +quantity + 1 }));
  };

  const handleChange = (id, quantity) => {
    setValue(quantity);
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <tr className="cart__item">
      <td className="cart__image p-3">
        <img src={thumbnail} alt="product" />
      </td>
      <td className="cart__title">{title}</td>
      <td className="cart__price">{formatMoney(price)}</td>
      <td className="cart__quantity">
        <Button
          variant="secondary rounded-0"
          size="sm"
          disabled={quantity === 1}
          onClick={() => handleDecrement(id)}
        >
          <FontAwesomeIcon icon={faMinus} />
        </Button>
        <input
          type="number"
          min="1"
          value={value}
          onChange={(event) => handleChange(id, event.target.value)}
        />
        <Button
          variant="secondary rounded-0"
          size="sm"
          onClick={() => handleIncrement(id)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </td>
      <td className="cart__delete">
        <Button variant="link cart__delete" onClick={() => setShow(true)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </td>

      <ModalComponent
        show={show}
        onHide={() => setShow(false)}
        title={t("modal title delete")}
        body={t("modal body delete")}
        close={t("cancel")}
        action={t("delete")}
        handleClose={() => setShow(false)}
        handleAction={() => handleDeleteProduct(id)}
      />
    </tr>
  );
}

export default CartItem;
