import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { email_regex, password_regex, phone_regex } from "../../../constants";
import { useToggle } from "../../../hooks/useToggle";
import { getUser, updateUser } from "../../../store/Slice/userSlice";
import { getDataFromLocalStorage } from "../../../utils";
import FormGroup from "../../FormGroup";
import ModalComponent from "../../Modal";
import ChangePassword from "./ChangePassword";

function ManageAccount() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [show, setShow] = useToggle();
  const user = getDataFromLocalStorage("user") || {};
  const { id, username, email, phone, address } = user;
  const { password } = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(getUser(id));
  }, [id, dispatch]);

  const formik = useFormik({
    initialValues: {
      email: email || "",
      username: username || "",
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
      const newUser = { id, ...formik.values };
      dispatch(updateUser(newUser));
      localStorage.setItem("user", JSON.stringify(newUser));
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      currPass: "",
      newPass: "",
      confirmPass: "",
    },
    validationSchema: Yup.object({
      currPass: Yup.string()
        .test("match", t("error confirm password"), function (currPass) {
          return currPass === password;
        })
        .required(t("required information")),
      newPass: Yup.string()
        .matches(password_regex, t("required password"))
        .required(t("required information")),
      confirmPass: Yup.string()
        .oneOf([Yup.ref("newPass")], t("error confirm password"))
        .required(t("required information")),
    }),
    onSubmit: () => {
      dispatch(updateUser({ id, password: formikPassword.values.newPass }));
      setShow(false);
    },
  });

  return (
    <div className="account">
      <h1 className="fs-5 pb-3">{t("manage my account")}</h1>
      <Form onSubmit={formik.handleSubmit} className="signup__form">
        <Row>
          <Col>
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
              label={`${t("phone number")}*`}
              id="phone"
              type="text"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.errors.phone}
            />
            <Button
              type="button"
              onClick={() => setShow(true)}
              className="text-uppercase btn btn-light w-100 py-2 my-3"
            >
              {t("change password")}
            </Button>
          </Col>
          <Col>
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
              label={`${t("shipping address")}*`}
              id="address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.errors.address}
            />
            <Button type="submit" className="signup__submit w-100 py-2 my-3">
              {t("save")}
            </Button>

            <ModalComponent
              show={show}
              onHide={() => setShow(false)}
              title={t("change password")}
              body={<ChangePassword formik={formikPassword} />}
              close={t("cancel")}
              action={t("save")}
              handleClose={() => setShow(false)}
              handleAction={() => formikPassword.handleSubmit()}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ManageAccount;
