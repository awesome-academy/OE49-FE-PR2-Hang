import { Button, Modal } from "react-bootstrap";

function ModalComponent({
  show,
  onHide,
  title,
  body,
  close,
  action,
  handleClose,
  handleAction,
}) {
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header className="border-0 py-3" closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-0">{body}</Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="light" onClick={handleClose}>
          {close}
        </Button>
        <Button variant="secondary" onClick={handleAction}>
          {action}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
