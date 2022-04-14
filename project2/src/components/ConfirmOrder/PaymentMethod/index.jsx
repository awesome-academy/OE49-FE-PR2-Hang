import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./style.scss";

function PaymentMethod() {
  const { t } = useTranslation();

  return (
    <div className="summary">
      <h2 className="summary__title">{t("payment method")}</h2>
      <Form>
        <Form.Check
          defaultChecked
          name="payment"
          type="radio"
          id="delivery"
          label={t("payment on delivery")}
          className="border border-1 mt-3 p-2"
        />
        <Form.Check
          name="payment"
          type="radio"
          id="card"
          label="Credit/Debit Card"
          className="border border-1 mt-3 p-2"
        />
      </Form>
    </div>
  );
}

export default PaymentMethod;
