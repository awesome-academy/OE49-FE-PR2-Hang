import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toast, ToastContainer } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function ToastComponent({ show, onClose, content }) {
  const { t } = useTranslation();

  return (
    <ToastContainer
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1000 }}
    >
      <Toast
        className="bg-success text-white"
        show={show}
        onClose={onClose}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <FontAwesomeIcon
            className="text-success me-2"
            style={{ fontSize: 1.2 + "rem" }}
            icon={faCheckCircle}
          />
          <strong className="me-auto">{t("notification")}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{content}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastComponent;
