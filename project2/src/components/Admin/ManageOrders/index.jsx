import { useEffect } from "react";
import { Button, Tab, Table, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusOrder } from "../../../store/Slice/adminSlice";
import { getAllOrders } from "../../../store/Slice/adminSlice";
import { formatMoney, totalMoney, totalProducts } from "../../../utils";

function ManageOrders() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [orders, dispatch]);

  const orderItem = (order, index) => {
    const { id, username, phone, products, status } = order;

    const handleChangeStatus = ({ id, status }) => {
      dispatch(updateStatusOrder({ id, status }));
    };

    return (
      <tbody key={id}>
        <tr className="cart__item border-0">
          <td className="cart__image p-3">{index + 1}</td>
          <td className="cart__image">
            {products.map((product, index) => {
              const { thumbnail, title } = product;
              return (
                <div key={index} className="d-flex align-items-center p-1">
                  <img src={thumbnail} alt={title} />
                  <p className="cart__title ms-3">{title}</p>
                </div>
              );
            })}
          </td>
          <td className="cart__price">{formatMoney(totalMoney(products))}</td>
          <td className="px-3">
            <span>{totalProducts(products)}</span>
          </td>
          <td>{username}</td>
          <td>{phone}</td>
          <td className="px-3 mb-3">
            {status === "Pending" ? (
              <>
                <Button
                  variant="btn-outline text-success fw-bold"
                  onClick={() => handleChangeStatus({ id, status: "Accept" })}
                >
                  Accept
                </Button>
                <Button
                  variant="btn-outline text-danger fw-bold"
                  onClick={() => handleChangeStatus({ id, status: "Reject" })}
                >
                  Reject
                </Button>
              </>
            ) : (
              <span>{status}</span>
            )}
          </td>
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
            <th className="address__title px-3 py-2">STT</th>
            <th className="address__title text-capitalize text-start px-3 py-2">
              {t("product")}
            </th>
            <th className="address__title px-3 py-2">{t("price")}</th>
            <th className="address__title px-3 py-2">{t("quantity")}</th>
            <th className="address__title px-3 py-2">{t("full name")}</th>
            <th className="address__title px-3 py-2">{t("phone number")}</th>
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
      <h2 className="orders__title fs-5 mb-3">{t("manage orders")}</h2>
      <Tabs defaultActiveKey="all" id="orders" className="bg-light mb-3">
        <Tab eventKey="all" title="All">
          {orderList("")}
        </Tab>
        <Tab eventKey="processing" title="Pending">
          {orderList("Pending")}
        </Tab>
        <Tab eventKey="delivered" title="Accept">
          {orderList("Accept")}
        </Tab>
        <Tab eventKey="cancelled" title="Reject">
          {orderList("Reject")}
        </Tab>
      </Tabs>
    </div>
  );
}

export default ManageOrders;
