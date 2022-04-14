import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { formatMoney, getDataFromLocalStorage, totalMoney } from "../../../utils";
import "./style.scss";

function OrderSummary(props) {
  const { label, link, onClick } = props;
  const { t } = useTranslation();
  const cart = getDataFromLocalStorage("cart");
  const { products } = cart;
  const total = totalMoney(products);
  const shippingFee = 30000;

  return (
    <div className="summary">
      <h2 className="summary__title">{t("summary title")}</h2>
      <div className="summary__item">
        <span>{t("summary money")}</span>
        <span className="price">{formatMoney(total)}</span>
      </div>
      <div className="summary__item">
        <span>{t("shipping fee")}</span>
        <span className="price">{formatMoney(shippingFee)}</span>
      </div>
      <div className="summary__item border-top my-3">
        <span>{t("total")}</span>
        <div>
          <span className="total">{formatMoney(total + shippingFee)}</span>
          <p className="summary__vat">{t("vat")}</p>
        </div>
      </div>
      <Link to={link} onClick={onClick} className="btn summary__confirm my-3">
        {t(label)}
      </Link>
    </div>
  );
}

export default OrderSummary;
