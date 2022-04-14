import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { formatMoney, getDataFromLocalStorage } from "../../../utils";

function CartInfo() {
  const { t } = useTranslation();
  const cart = getDataFromLocalStorage("cart");
  const { products } = cart;

  const cartItem = (product) => {
    const { id, thumbnail, title, price, quantity } = product;

    return (
      <tr key={id} className="cart__item">
        <td className="cart__image p-3">
          <img src={thumbnail} alt="product" />
        </td>
        <td className="cart__title">{title}</td>
        <td className="cart__price">{formatMoney(price)}</td>
        <td className="text-end px-3">
          <span className="me-2">{t("quantity")}:</span>
          <span>{quantity}</span>
        </td>
      </tr>
    );
  };

  return (
    <Table responsive="sm">
      <thead>
        <tr>
          <th colSpan={4} className="address__title px-3 py-2">
            <span className="float-start p-0">{t("package")}</span>
            <span className="float-end p-0">{t("shipped by")} Lazada</span>
          </th>
        </tr>
      </thead>
      <tbody className="border-0">
        {products.map((product) => cartItem(product))}
      </tbody>
    </Table>
  );
}

export default CartInfo;
