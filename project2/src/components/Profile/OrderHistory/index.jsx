import { useEffect } from "react";
import { Tab, Table, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../store/Slice/userSlice";
import { formatMoney, getDataFromLocalStorage } from "../../../utils";

function OrderHistory() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = getDataFromLocalStorage("user");
  const { orders } = useSelector((state) => state.userReducer);
  const myOrders = orders.filter((item) => item.userId === id);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderItem = (order, indexOrder) => {
    const { products } = order;

    return (
      <tbody key={indexOrder}>
        {products.map((product, index) => {
          const { thumbnail, title, price, quantity } = product;

          return (
            <tr key={index} className="cart__item border-0">
              {!index && (
                <td rowSpan={products.length} className="cart__image p-3">
                  {indexOrder + 1}
                </td>
              )}
              <td className="cart__image">
                <img src={thumbnail} alt={title} />
              </td>
              <td className="cart__title">{title}</td>
              <td className="cart__price">{formatMoney(+price)}</td>
              <td className="px-3">
                <span className="me-2">{t("quantity")}:</span>
                <span>{quantity}</span>
              </td>
              {!index && (
                <td
                  rowSpan={products.length}
                  className=" text-center px-3 mb-3"
                >
                  Pending
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <div className="orders cart">
      <h2 className="orders__title fs-5 mb-3">{t("my orders")}</h2>
      {myOrders.length ? (
        <Tabs
          defaultActiveKey="processing"
          id="orders"
          className="bg-light mb-3"
        >
          <Tab eventKey="all" title={t("all products")}></Tab>
          <Tab eventKey="processing" title={t("processing")}>
            <Table className="m-0" responsive="sm">
              <thead>
                <tr>
                  <th className="address__title px-3 py-2">ID</th>
                  <th
                    colSpan="2"
                    className="address__title text-capitalize px-3 py-2"
                  >
                    {t("product")}
                  </th>
                  <th className="address__title px-3 py-2">{t("price")}</th>
                  <th className="address__title px-3 py-2">{t("quantity")}</th>
                  <th className="address__title px-3 py-2  text-center">
                    {t("status")}
                  </th>
                </tr>
              </thead>
              {myOrders.map((order, index) => orderItem(order, index))}
            </Table>
          </Tab>
          <Tab eventKey="delivered" title={t("delivered")}></Tab>
          <Tab eventKey="cancelled" title={t("cancelled")}></Tab>
        </Tabs>
      ) : (
        <div>Chưa có đơn hàng</div>
      )}
    </div>
  );
}

export default OrderHistory;
