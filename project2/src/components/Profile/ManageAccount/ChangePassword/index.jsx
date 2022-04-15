import { Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormGroup from "../../../FormGroup";

function ChangePassword({ formik }) {
  const { t } = useTranslation();

  return (
    <Form>
      <Row>
        <FormGroup
          label={`${t("current password")}*`}
          id="currPass"
          type="password"
          value={formik.values.currPass}
          onChange={formik.handleChange}
          error={formik.errors.currPass}
        />
        <FormGroup
          label={`${t("new password")}*`}
          id="newPass"
          type="password"
          value={formik.values.newPass}
          onChange={formik.handleChange}
          error={formik.errors.newPass}
        />
        <FormGroup
          label={`${t("confirm password")}*`}
          id="confirmPass"
          type="password"
          value={formik.values.confirmPass}
          onChange={formik.handleChange}
          error={formik.errors.confirmPass}
        />
      </Row>
    </Form>
  );
}

export default ChangePassword;
