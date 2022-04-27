import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Button, Form, Modal, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  fetchProducts,
  fetchCategories,
} from "../../../store/Slice/productSlice";
import { useToggle } from "../../../hooks/useToggle.js";
import FormGroup from "../../FormGroup";
import { useFormik } from "formik";
import * as Yup from "yup";
import PaginationComponent from "../../Pagination";
import ProductItem from "./ProductItem";
import Search from "../../Filter/Search";

function ManageProducts() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useToggle(false);
  const { products, totalCount, filter, categories } = useSelector(
    (state) => state.productReducer
  );
  const limit = 5;

  useEffect(() => {
    dispatch(fetchProducts({ ...filter, _limit: limit }));
    dispatch(fetchCategories());
  }, [products, filter, dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      thumbnail: "",
      price: "",
      brand: "",
      category: "",
      description: "",
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
      dispatch(addProduct({ ...formik.values }));
      setOpen(false);
      formik.resetForm();
    },
  });

  return (
    <div className="orders cart">
      <h2 className="orders__title fs-5 mb-3 float-start">
        {t("manage products")}
        <Button variant="link cart__delete" onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Modal show={open} onHide={() => setOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{t("add product")}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={formik.handleSubmit} className="signup__form px-2">
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
                  {`${t("category")}*`}
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
                    onClick={() => setOpen(false)}
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    type="submit"
                    className="signup__submit py-2 ms-2 my-3"
                  >
                    {t("add product")}
                  </Button>
                </div>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </h2>
      <Search link="/admin" />
      {products.length ? (
        <Table className="m-0 text-center" responsive="sm">
          <thead>
            <tr>
              <th className="address__title px-3 py-2">STT</th>
              <th className="address__title text-capitalize text-nowrap px-3 py-2">
                {t("image")}
              </th>
              <th className="address__title px-3 py-2 text-nowrap">
                {t("title")}
              </th>
              <th className="address__title px-3 py-2">{t("price")}</th>
              <th className="address__title px-3 py-2">{t("description")}</th>
              <th className="address__title px-3 py-2 text-nowrap">
                {t("brand")}
              </th>
              <th className="address__title px-3 py-2 text-nowrap text-center">
                {t("actions")}
              </th>
            </tr>
          </thead>
          {products.map((product, index) => (
            <tbody key={index}>
              <ProductItem
                product={product}
                index={index + (filter._page - 1) * limit + 1}
              />
            </tbody>
          ))}
        </Table>
      ) : (
        <div>{t("no products")}</div>
      )}
      <PaginationComponent
        totalCount={totalCount}
        filter={{ ...filter, _limit: limit }}
      />
    </div>
  );
}

export default ManageProducts;
