import "./style.scss";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import FormGroup from "../FormGroup";
import { useFormik } from "formik";
import * as Yup from "yup";
import { email_regex, password_regex, USER_ROLE } from "../../constants";
import { useDispatch } from "react-redux";
import { signup } from "../../store/Slice/userSlice";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../../firebase";
import { useState } from "react";
import { auth } from "../../firebase";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errorSignUp, setErrorSignUp] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(email_regex, t("required email"))
        .required(t("required information")),
      username: Yup.string()
        .min(2, t("required name"))
        .max(50, t("required name"))
        .required(t("required information")),
      password: Yup.string()
        .matches(password_regex, t("required password"))
        .required(t("required information")),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], t("error confirm password"))
        .required(t("required information")),
    }),

    onSubmit: (values) => {
      const { username, email, password } = values;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem(
            "user",
            JSON.stringify({ id: user.uid, username, email, role: USER_ROLE })
          );

          dispatch(
            signup({ id: user.uid, username, email, password, role: USER_ROLE })
          );
          navigate("/");
        })
        .catch((error) => {
          setErrorSignUp(error.message);
        });
    },
  });

  return (
    <div className="signup">
      <Container className="signup__wrap">
        <Link to="/login" className="float-end">
          {t("login here")}
        </Link>
        <h1 className="signup__title pb-4">{t("create account")}</h1>
        <Form onSubmit={formik.handleSubmit} className="signup__form">
          <Row>
            <Col md={6}>
              <p className="text-danger pb-1">{errorSignUp}</p>
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
                label={`${t("full name")}*`}
                id="username"
                type="text"
                placeholder={t("full name")}
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.errors.username}
              />
            </Col>
            <Col md={6}>
              <FormGroup
                label={`${t("password")}*`}
                id="password"
                type="password"
                placeholder={t("required password")}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
              />
              <FormGroup
                label={`${t("confirm password")}*`}
                id="confirm_password"
                type="password"
                placeholder={t("confirm password")}
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                error={formik.errors.confirm_password}
              />
              <Button type="submit" className="signup__submit w-100 py-2 my-3">
                {t("sign up")}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default SignUp;
