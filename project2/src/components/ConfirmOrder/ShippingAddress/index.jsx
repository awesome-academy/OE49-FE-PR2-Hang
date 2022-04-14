import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getDataFromLocalStorage } from "../../../utils";
import "./style.scss";

function ShippingAddress() {
  const { t } = useTranslation();
  const paymentInfo = getDataFromLocalStorage("payment-info");
  const { username, email, phone, address } = paymentInfo;

  return (
    <div className="address">
      <h2 className="address__title px-3 py-2 mb-2">
        {t("shipping address")}
        <Link to="/payment" className="float-end">
          {t("edit")}
        </Link>
      </h2>
      <div className="row pt-2">
        <p className="me-2 col">{t("full name")}</p>
        <span className="col">{username}</span>
      </div>
      <div className="row pt-2">
        <p className="me-2 col">Email</p>
        <span className="col">{email}</span>
      </div>
      <div className="row pt-2">
        <p className="me-2 col">{t("phone number")}</p>
        <span className="col">{phone}</span>
      </div>
      <div className="row pt-2">
        <p className="me-2 col">{t("shipping address")}</p>
        <span className="col">{address}</span>
      </div>
    </div>
  );
}

export default ShippingAddress;
