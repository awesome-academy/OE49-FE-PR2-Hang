import { useFormik } from "formik";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormGroup from "../FormGroup";
import * as Yup from "yup";
import "./style.scss";
import { email_regex, phone_regex } from "../../constants";
import { getDataFromLocalStorage } from "../../utils";

function PaymentInfo() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = getDataFromLocalStorage("user");
  const paymentInfo = getDataFromLocalStorage("payment-info") || {};
  const { username, email, phone, address } = paymentInfo;

  const formik = useFormik({
    initialValues: {
      email: email || user.email,
      username: username || user.username,
      phone: phone || "",
      address: address || "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, t("required name"))
        .max(50, t("required name"))
        .required(t("required information")),
      email: Yup.string()
        .matches(email_regex, t("required email"))
        .required(t("required information")),
      phone: Yup.string()
        .matches(phone_regex, t("required phone"))
        .required(t("required information")),
      address: Yup.string().required(t("required information")),
    }),
    onSubmit: () => {
      localStorage.setItem(
        "payment-info",
        JSON.stringify({ ...formik.values })
      );
      navigate("/confirm-order");
    },
  });

  return (
    <div className="signup">
      <Container className="signup__wrap login__wrap">
        <h1 className="signup__title pb-4">{t("shipping address")}</h1>
        <Form onSubmit={formik.handleSubmit} className="signup__form">
          <Row>
            <FormGroup
              label={`${t("full name")}*`}
              id="username"
              type="text"
              placeholder={t("full name")}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors.username}
            />
            <FormGroup
              label="Email*"
              id="email"
              type="text"
              placeholder={t("enter email")}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
            <FormGroup
              label={`${t("phone number")}*`}
              id="phone"
              type="text"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.errors.phone}
            />
            <FormGroup
              label={`${t("shipping address")}*`}
              id="address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.errors.address}
            />
            <Button
              onClick={() => navigate("/cart")}
              type="button"
              className="text-uppercase btn btn-light w-50 py-2 my-3"
            >
              {t("back")}
            </Button>
            <Button type="submit" className="signup__submit w-50 py-2 my-3">
              {t("confirm order")}
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default PaymentInfo;
