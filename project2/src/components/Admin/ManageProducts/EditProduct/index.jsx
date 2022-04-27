import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Col, Container, Form, Nav, Row, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  fetchCategories,
} from "../../../../store/Slice/productSlice";
import * as Yup from "yup";
import FormGroup from "../../../FormGroup";
import { useLocation, useNavigate } from "react-router-dom";
import ManageOrders from "../../ManageOrders";

function EditProduct() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id, thumbnail, title, price, description, brand, category } =
    location.state;
  const { categories } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: title,
      thumbnail: thumbnail,
      price: price,
      brand: brand,
      category: category,
      description: description,
    },
    validationSchema: Yup.object({
      title: Yup.string().required(t("required information")),
      thumbnail: Yup.string().required(t("required information")),
      price: Yup.string().required(t("required information")),
      brand: Yup.string().required(t("required information")),
      category: Yup.string().required(t("required information")),
      description: Yup.string().required(t("required information")),
    }),
    onSubmit: () => {
      dispatch(editProduct({ ...formik.values, id }));
      navigate("/admin");
    },
  });

  return (
    <div className="profile py-3">
      <Container>
        <Tab.Container id="admin" defaultActiveKey="products">
          <Row>
            <Col sm={2}>
              <Nav className="flex-column">
                <Nav.Item>
                  <Nav.Link className="ps-0" eventKey="products">
                    {t("manage products")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="ps-0" eventKey="orders">
                    {t("manage orders")}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="orders">
                  <ManageOrders />
                </Tab.Pane>
                <Tab.Pane eventKey="products">
                  <Form
                    onSubmit={formik.handleSubmit}
                    className="signup__form px-4"
                  >
                    <Row>
                      <FormGroup
                        label={`${t("title")}*`}
                        id="title"
                        type="text"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.errors.title}
                      />
                      <FormGroup
                        label={`${t("image")}*`}
                        id="thumbnail"
                        type="text"
                        value={formik.values.thumbnail}
                        onChange={formik.handleChange}
                        error={formik.errors.thumbnail}
                      />
                      <FormGroup
                        label={`${t("price")}*`}
                        id="price"
                        type="number"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.errors.price}
                      />
                      <FormGroup
                        label={`${t("brand")}*`}
                        id="brand"
                        type="text"
                        value={formik.values.brand}
                        onChange={formik.handleChange}
                        error={formik.errors.brand}
                      />
                      <Form.Label className="pb-4">
                        {`${t("categories")}*`}
                        <Form.Select
                          className="mt-3"
                          id="category"
                          value={formik.values.category}
                          onChange={formik.handleChange}
                        >
                          <option value="" disabled>
                            --Select Category--
                          </option>
                          {categories.map((category, index) => {
                            return (
                              <option key={index} value={category}>
                                {category}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {formik.errors.category && (
                          <p className="error text-danger mt-2">
                            {formik.errors.category}
                          </p>
                        )}
                      </Form.Label>
                      <FormGroup
                        label={`${t("description")}*`}
                        id="description"
                        type="textarea"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.errors.description}
                      />
                      <div className="text-end">
                        <Button
                          type="button"
                          className="btn-secondary text-uppercase py-2 my-3"
                          onClick={() => navigate("/admin")}
                        >
                          {t("back")}
                        </Button>
                        <Button
                          type="submit"
                          className="signup__submit py-2 ms-2 my-3"
                        >
                          {t("save")}
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default EditProduct;
