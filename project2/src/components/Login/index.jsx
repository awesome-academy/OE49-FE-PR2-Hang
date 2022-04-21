import "./style.scss";
import { Button, Container, Form, Row } from "react-bootstrap";
import FormGroup from "../FormGroup";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ADMIN_ROLE, email_regex, password_regex } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getUser } from "../../store/Slice/userSlice";
import { auth } from "../../firebase";

function Login() {
  const [errorLogin, setErrorLogin] = useState("");
  const { user } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const { id, username, email, role } = user;

    if (Object.keys(user).length) {
      role === ADMIN_ROLE ? navigate("/admin") : navigate(-1);

      localStorage.setItem(
        "user",
        JSON.stringify({ id, username, email, role })
      );
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(email_regex, t("required email"))
        .required(t("required information")),
      password: Yup.string()
        .matches(password_regex, t("required password"))
        .required(t("required information")),
    }),
    onSubmit: () => {
      const { email, password } = formik.values;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const { uid } = userCredential.user;
          dispatch(getUser(uid));
        })
        .catch(() => {
          setErrorLogin(t("error login"));
        });
    },
  });

  return (
    <div className="signup">
      <Container className="signup__wrap login__wrap">
        <h1 className="signup__title pb-1">{t("welcome login")}</h1>
        <Link to="/signup">{t("signup here")}</Link>
        <Form onSubmit={formik.handleSubmit} className="signup__form mt-4">
          <p className="text-danger my-2">{errorLogin}</p>
          <Row>
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
              label={`${t("password")}*`}
              id="password"
              type="password"
              placeholder={t("required password")}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />
            <Button type="submit" className="signup__submit w-100 py-2 my-3">
              {t("login")}
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
