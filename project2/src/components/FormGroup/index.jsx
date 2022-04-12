import { Form } from "react-bootstrap";

function FormGroup({ label, id, type, onChange, ...rest }) {
  return (
    <Form.Group className="form-group pb-4" hasvalidation="true">
      <Form.Label className="pb-1">{label}</Form.Label>
      <Form.Control id={id} type={type} onChange={onChange} {...rest} />
      {rest.error && <p className="error text-danger mt-2">{rest.error}</p>}
    </Form.Group>
  );
}

export default FormGroup;
