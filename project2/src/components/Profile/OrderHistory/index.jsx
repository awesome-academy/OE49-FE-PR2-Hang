import { useEffect } from "react";
import { Tab, Table, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../store/Slice/userSlice";
import {
  formatMoney,
  getDataFromLocalStorage,
  totalMoney,
  totalProducts,
} from "../../../utils";

function OrderHistory() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = getDataFromLocalStorage("user");
  const { orders } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getOrders(id));
  }, [id, dispatch]);

  const orderItem = (order, indexOrder) => {
    const { products, status } = order;

    return (
      <tbody key={indexOrder}>
        <tr className="cart__item border-0">
          <td className="cart__image p-3">{indexOrder + 1}</td>
          <td className="cart__image">
            {products.map((product, index) => {
              const { thumbnail, title } = product;
              return (
                <div key={index} className="d-flex align-items-center p-1">
                  <img src={thumbnail} alt={title} />
                  <h2 className="cart__title ms-3">{title}</h2>
                </div>
              );
            })}
          </td>
          <td className="cart__price">{formatMoney(totalMoney(products))}</td>
          <td className="px-3">
            <span>{totalProducts(products)}</span>
          </td>
          <td className=" text-center px-3 mb-3">{status}</td>
        </tr>
      </tbody>
    );
  };

  const orderList = (status) => {
    const orderList = status
      ? orders.filter((item) => item.status === status)
      : orders;

    return orderList.length ? (
      <Table className="m-0 text-center" responsive="sm">
        <thead>
          <tr>
            <th className="address__title px-3 py-2">ID</th>
            <th className="address__title text-capitalize text-start px-3 py-2">
              {t("product")}
            </th>
            <th className="address__title px-3 py-2">{t("price")}</th>
            <th className="address__title px-3 py-2">{t("quantity")}</th>
            <th className="address__title px-3 py-2">{t("status")}</th>
          </tr>
        </thead>
        {orderList.map((order, index) => orderItem(order, index))}
      </Table>
    ) : (
      <div>{t("no orders")}</div>
    );
  };

  return (
    <div className="orders cart">
      <h2 className="orders__title fs-5 mb-3">{t("my orders")}</h2>
      <Tabs defaultActiveKey="processing" id="orders" className="bg-light mb-3">
        <Tab eventKey="all" title={t("all products")}>
          {orderList("")}
        </Tab>
        <Tab eventKey="processing" title={t("processing")}>
          {orderList("Pending")}
        </Tab>
        <Tab eventKey="delivered" title={t("delivered")}>
          {orderList("Accept")}
        </Tab>
        <Tab eventKey="cancelled" title={t("cancelled")}>
          {orderList("Reject")}
        </Tab>
      </Tabs>
    </div>
  );
}

export default OrderHistory;
