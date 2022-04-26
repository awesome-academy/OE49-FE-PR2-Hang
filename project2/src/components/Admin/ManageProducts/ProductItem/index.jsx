import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../store/Slice/productSlice";
import { formatMoney } from "../../../../utils";
import { Link } from "react-router-dom";
import { useToggle } from "../../../../hooks/useToggle";
import { useTranslation } from "react-i18next";
import ModalComponent from "../../../Modal";

function ProductItem({ product, index }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [show, setShow] = useToggle(false);
  const { id, thumbnail, title, price, description, brand } = product;

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
    setShow(false);
  };

  return (
    <tr className="cart__item border-0">
      <td className="cart__image p-3">{index}</td>
      <td className="cart__image">
        <img src={thumbnail} alt={title} />
      </td>
      <td className="cart__title">{title}</td>
      <td className="cart__price">{formatMoney(+price)}</td>
      <td className="cart__title">{description}</td>
      <td className="cart__title">{brand}</td>
      <td className="d-flex align-items-center px-3">
        <Button variant="link cart__delete" onClick={() => setShow(true)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
        <Link
          to={`/edit-product/${id}`}
          state={product}
          className="link cart__delete"
          type="button"
        >
          <FontAwesomeIcon icon={faEdit} />
        </Link>

        <ModalComponent
          show={show}
          onHide={() => setShow(false)}
          title={t("Xóa sản phẩm")}
          body={t("confirm delete product")}
          close={t("cancel")}
          action={t("delete")}
          handleClose={() => setShow(false)}
          handleAction={() => handleDeleteProduct(id)}
        />
      </td>
    </tr>
  );
}

export default ProductItem;
